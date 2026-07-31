#!/usr/bin/env sh
set -eu

cd /app
bun install --frozen-lockfile --ignore-scripts

exec bun run dev --filter=editor --ui=stream
