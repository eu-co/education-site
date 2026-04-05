# =============================================================================
# Dockerfile — Multi-stage build for Next.js (used by BOTH repos)
# =============================================================================
# Copy this file into both euco-website/ and euco-education/ repos.
# It produces a minimal production image (~150 MB vs ~1 GB for a naive build).
#
# The three stages:
#   1. deps    — install node_modules (cached unless package.json changes)
#   2. builder — run `next build` (produces .next/standalone)
#   3. runner  — copy only the built output into a clean Alpine image
# =============================================================================

# ── Stage 1: Install dependencies ────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files first (Docker caches this layer if they haven't changed)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# ── Stage 2: Build the application ───────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects anonymous telemetry — disable in production builds
ENV NEXT_TELEMETRY_DISABLED=1

# Build the app. This generates .next/standalone (a self-contained server)
RUN npm run build

# ── Stage 3: Production runner ───────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy the standalone build output
# next.config.js must have: output: 'standalone'
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# The port is set via environment variable in docker-compose.yml
# Default to 3000 if not set
EXPOSE ${PORT:-3000}
ENV PORT=${PORT:-3000}
ENV HOSTNAME="0.0.0.0"

# The standalone output includes its own minimal server
CMD ["node", "server.js"]
