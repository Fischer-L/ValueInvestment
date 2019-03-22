FROM node:10.15.1-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json yarn.lock ./
COPY src src

RUN yarn install --pure-lockfile && yarn cache clean
RUN yarn build-prod

CMD node src/server/server.js
