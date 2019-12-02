FROM node:10.15.1-alpine AS base

RUN mkdir -p /app
WORKDIR /app

COPY package.json yarn.lock ./
COPY src src
COPY public public


FROM base AS test
COPY node_modules node_modules
CMD ENV=docker-test node src/server/server.js


FROM base AS production

RUN rm -r src/client && yarn install --production --pure-lockfile && yarn cache clean
ARG arg_env=production
ENV env=$arg_env
CMD ENV=$env node src/server/server.js
