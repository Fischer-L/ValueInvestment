FROM node:10.15.1-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json yarn.lock ./
COPY public public
COPY src/build src/build
COPY src/server src/server

RUN yarn install --production --pure-lockfile && yarn cache clean

ARG arg_env=production
ENV env=$arg_env
CMD ENV=$env node src/server/server.js
