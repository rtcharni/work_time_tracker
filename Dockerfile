FROM node:14-alpine

RUN apk add python make gcc g++

WORKDIR /app

COPY package*.json ./

RUN npm i && npm install -g @angular/cli typescript

COPY ./ ./

WORKDIR /app/client

RUN npm i

WORKDIR /app

RUN npm run build:all

ENV PORT=3000
ENV NODE_ENV=production
ENV REALDATA=1

EXPOSE 3000

CMD [ "node", "dist/src/index.js" ]