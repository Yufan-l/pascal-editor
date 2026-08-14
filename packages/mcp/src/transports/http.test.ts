import { afterEach, beforeEach, expect, test } from 'bun:test'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { SceneBridge } from '../bridge/scene-bridge'
import { createSceneOperations } from '../operations'
import { createPascalMcpServer } from '../server'
import { connectHttp, type HttpTransportHandle } from './http'

let bridge: SceneBridge
let createServer: () => McpServer
let handle: HttpTransportHandle | null = null

beforeEach(() => {
  bridge = new SceneBridge()
  bridge.loadDefault()
  const operations = createSceneOperations({ bridge })
  createServer = () => createPascalMcpServer({ bridge, operations })
})

afterEach(async () => {
  if (handle) {
    await handle.close()
    handle = null
  }
})

test('connectHttp listens on the given port and accepts MCP traffic', async () => {
  // Port 0 → OS assigns an ephemeral port.
  handle = await connectHttp(createServer, 0, { authToken: '' })
  expect(handle.port).toBeGreaterThan(0)

  const url = new URL(`http://127.0.0.1:${handle.port}/mcp`)
  const clientTransport = new StreamableHTTPClientTransport(url)
  const client = new Client({ name: 'http-test-client', version: '0.0.0' })

  try {
    await client.connect(clientTransport)
    const tools = await client.listTools()
    expect(Array.isArray(tools.tools)).toBe(true)
  } finally {
    await client.close()
  }
})

test('connectHttp accepts a new client after a previous client disconnects', async () => {
  handle = await connectHttp(createServer, 0, { authToken: '' })
  const url = new URL(`http://127.0.0.1:${handle.port}/mcp`)

  const firstTransport = new StreamableHTTPClientTransport(url)
  const firstClient = new Client({ name: 'first-http-client', version: '0.0.0' })
  await firstClient.connect(firstTransport)
  expect((await firstClient.listTools()).tools.length).toBeGreaterThan(0)
  const firstSessionId = firstTransport.sessionId
  await firstClient.close()

  const secondTransport = new StreamableHTTPClientTransport(url)
  const secondClient = new Client({ name: 'second-http-client', version: '0.0.0' })
  try {
    await secondClient.connect(secondTransport)
    expect((await secondClient.listTools()).tools.length).toBeGreaterThan(0)
    expect(secondTransport.sessionId).toBeDefined()
    expect(secondTransport.sessionId).not.toBe(firstSessionId)
  } finally {
    await secondClient.close()
  }
})

test('connectHttp keeps concurrent client sessions independent', async () => {
  handle = await connectHttp(createServer, 0, { authToken: '' })
  const url = new URL(`http://127.0.0.1:${handle.port}/mcp`)
  const firstTransport = new StreamableHTTPClientTransport(url)
  const secondTransport = new StreamableHTTPClientTransport(url)
  const firstClient = new Client({ name: 'concurrent-http-client-a', version: '0.0.0' })
  const secondClient = new Client({ name: 'concurrent-http-client-b', version: '0.0.0' })

  try {
    await Promise.all([firstClient.connect(firstTransport), secondClient.connect(secondTransport)])
    const [firstTools, secondTools] = await Promise.all([
      firstClient.listTools(),
      secondClient.listTools(),
    ])
    expect(firstTools.tools.length).toBeGreaterThan(0)
    expect(secondTools.tools.length).toBe(firstTools.tools.length)
    expect(firstTransport.sessionId).not.toBe(secondTransport.sessionId)
  } finally {
    await Promise.allSettled([firstClient.close(), secondClient.close()])
  }
})

test('connectHttp removes a session after an MCP DELETE', async () => {
  handle = await connectHttp(createServer, 0, { authToken: '' })
  const url = new URL(`http://127.0.0.1:${handle.port}/mcp`)
  const transport = new StreamableHTTPClientTransport(url)
  const client = new Client({ name: 'terminating-http-client', version: '0.0.0' })

  try {
    await client.connect(transport)
    const sessionId = transport.sessionId
    expect(sessionId).toBeDefined()
    await transport.terminateSession()

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json, text/event-stream',
        'content-type': 'application/json',
        'mcp-session-id': sessionId!,
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
    })
    expect(response.status).toBe(404)
    expect(await response.json()).toMatchObject({
      error: { code: -32001, message: 'Session not found' },
    })
  } finally {
    await client.close()
  }
})

test('connectHttp close() stops the server', async () => {
  handle = await connectHttp(createServer, 0, { authToken: '' })
  const port = handle.port
  await handle.close()
  handle = null

  // A fresh fetch to the old port should fail (connection refused).
  let didConnect = false
  try {
    await fetch(`http://127.0.0.1:${port}/mcp`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{}',
      signal: AbortSignal.timeout(500),
    })
    didConnect = true
  } catch {
    didConnect = false
  }
  expect(didConnect).toBe(false)
})

test('connectHttp requires auth when binding a non-loopback host', async () => {
  await expect(connectHttp(createServer, 0, { host: '0.0.0.0', authToken: '' })).rejects.toThrow(
    /requires PASCAL_MCP_HTTP_TOKEN/,
  )
})

test('connectHttp rejects unauthenticated requests when a token is configured', async () => {
  handle = await connectHttp(createServer, 0, { authToken: 'secret' })

  const response = await fetch(`http://127.0.0.1:${handle.port}/mcp`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{}',
  })

  expect(response.status).toBe(401)
})

test('connectHttp handles allowed CORS preflight', async () => {
  handle = await connectHttp(createServer, 0, {
    authToken: 'secret',
    allowedOrigins: ['https://app.example'],
  })

  const response = await fetch(`http://127.0.0.1:${handle.port}/mcp`, {
    method: 'OPTIONS',
    headers: {
      origin: 'https://app.example',
      'access-control-request-method': 'POST',
    },
  })

  expect(response.status).toBe(204)
  expect(response.headers.get('access-control-allow-origin')).toBe('https://app.example')
})
