FROM node:10.15.1-alpine

RUN mkdir -p /app
WORKDIR /app

COPY public public
COPY src/build src/build
COPY src/server src/server
# We build the app from the outside so simply reuse the donwloaded node_modules
COPY node_modules node_modules

ARG arg_env=production
ENV env=$arg_env
CMD ENV=$env node src/server/server.js
