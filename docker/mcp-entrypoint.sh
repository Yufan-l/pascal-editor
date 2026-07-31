#!/usr/bin/env sh
set -eu

cd /app
bun install --frozen-lockfile --ignore-scripts
bun run build --filter=@pascal-app/mcp

exec bun packages/mcp/dist/bin/pascal-mcp.js \
  --http \
  --host 0.0.0.0 \
  --port "${MCP_PORT:-3917}" \
  --auth-token "${PASCAL_MCP_HTTP_TOKEN:-pascal-dev-token}"
