# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG PUBLIC_MESSAGE_ROUTER_URL
ENV PUBLIC_MESSAGE_ROUTER_URL=$PUBLIC_MESSAGE_ROUTER_URL

ARG PUBLIC_MESSAGE_ROUTER_API_KEY
ENV PUBLIC_MESSAGE_ROUTER_API_KEY=$PUBLIC_MESSAGE_ROUTER_API_KEY

RUN corepack enable pnpm && pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

RUN chown -R astro:nodejs /app

USER astro

EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]
