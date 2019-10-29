FROM node:10.16.0-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock tsconfig.base.json tsconfig.production.json ./
COPY src ./src
COPY typings ./typings

RUN yarn install && yarn build:prod

FROM node:10.16.0-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist

RUN chown -R node:node /app

USER node

RUN yarn install --production

EXPOSE 3000

CMD node dist/main.js
