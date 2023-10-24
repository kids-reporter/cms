ARG NODE_VERSION=18.12.0

FROM node:${NODE_VERSION} AS build

WORKDIR /build

COPY package.json yarn.lock /build/

RUN yarn install

COPY . /build/

RUN yarn build


FROM node:${NODE_VERSION}

WORKDIR /app

ENV NODE_ENV=production

# Automatically leverage output traces to reduce image size
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/dist ./dist
COPY --from=build /build/package.json ./package.json

CMD ["node", "dist/server.js"]
