# Pascal Editor — Setup

## Prerequisites

- [Bun](https://bun.sh/) 1.3+ (or Node.js 18+)

## Quick Start

```bash
bun install
bun dev
```

The editor will be running at **http://localhost:3002**.

## Docker Development

Start the editor and MCP server from the repository root:

```bash
docker compose up --build
```

Open **http://localhost:3002**. The MCP Streamable HTTP endpoint is available
at **http://localhost:3917/mcp** with the development bearer token
`pascal-dev-token`. Override the token with `PASCAL_MCP_HTTP_TOKEN` in `.env`.
Stop the containers with `Ctrl+C`. On later starts, `docker compose up` is
enough unless the Dockerfile or dependencies changed.

The Compose configuration mounts the repository for hot reload and keeps Linux
dependencies in named volumes, separate from the host. The editor and MCP
server share the `pascal-editor-data` volume so saved scenes and live MCP
updates are visible to both services and survive container recreation. To stop
containers started in the background, run:

```bash
docker compose down
```

`docker compose down -v` also deletes the shared scene database.

The equivalent manual commands are:

```bash
docker build -f Dockerfile.dev -t pascal-editor-dev .

docker run --rm -it --init \
  --name pascal-editor-dev \
  -p 3002:3002 \
  --mount type=bind,source="$(pwd)",target=/app \
  --mount type=volume,source=pascal-editor-node-modules,target=/app/node_modules \
  pascal-editor-dev
```

Changes under `apps/editor` are picked up by Next.js hot reload. Restart the
container after changing a package under `packages/`; package dependencies are
built once at startup because native TypeScript watchers cannot follow Docker
Desktop bind mounts. The first run initializes the dependency volume. Rebuild
the image after changing `package.json` or `bun.lock`.

## Environment Variables (optional)

Copy `.env.example` to `.env` if you need:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | No | Enables address search in the editor |
| `PORT` | No | Dev server port (default: 3002) |
| `MCP_PORT` | No | MCP Streamable HTTP port (default: 3917) |
| `PASCAL_MCP_HTTP_TOKEN` | No | MCP bearer token (development default: `pascal-dev-token`) |

The editor works fully without any environment variables.

## Monorepo Structure

```
├── apps/
│   └── editor/          # Next.js editor application
├── packages/
│   ├── core/            # @pascal-app/core — Scene schema, state, systems
│   ├── viewer/          # @pascal-app/viewer — 3D rendering
│   └── ui/              # Shared UI components
└── tooling/             # Build & release tooling
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start the development server |
| `bun build` | Build all packages |
| `bun check` | Lint and format check (Biome) |
| `bun check:fix` | Auto-fix lint and format issues |
| `bun check-types` | TypeScript type checking |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on submitting PRs and reporting issues.
