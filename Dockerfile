FROM node:10.15.1-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json yarn.lock ./
COPY src src
COPY public public

RUN rm -r src/client && yarn install --production --pure-lockfile && yarn cache clean

ARG arg_env=production
ENV env=$arg_env
CMD ENV=$env node src/server/server.js
