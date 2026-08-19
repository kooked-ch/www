# ─── deps ────────────────────────────────────────────────────────────────────
FROM oven/bun:1-slim AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# ─── builder ─────────────────────────────────────────────────────────────────
# Next's Turbopack-compiled server runtime crashes Bun's CommonJS loader, so the
# actual build runs under real Node.js; Bun is only used above for fast installs.
FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN node node_modules/.bin/next build

# ─── runner ──────────────────────────────────────────────────────────────────
# Same Bun/Turbopack CommonJS incompatibility as the builder stage hits at
# request time too, so the runner also needs real Node.js, not Bun.
FROM node:22-slim AS runner
WORKDIR /app

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
