FROM node:16-alpine As development

WORKDIR '/app'

COPY package.json ./

RUN npm i --omit=dev

COPY . .

RUN npm run build

EXPOSE 3000

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
