FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build
RUN npx prisma generate 

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma/client ./prisma/client

EXPOSE 3000

CMD ["node", "dist/main.js"]