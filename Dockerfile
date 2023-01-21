FROM node:16-alpine3.16 AS builder

WORKDIR /var/www/build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine3.16 AS production

WORKDIR /var/www/prod

COPY --from=builder /var/www/build/package.json /var/www/build/package-lock.json ./

RUN npm install --omit=dev --ignore-scripts

COPY --from=builder /var/www/build/dist ./dist
COPY --from=builder /var/www/build/server.js ./

EXPOSE 3000

CMD ["node", "./server.js"]
