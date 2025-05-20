FROM node:18 AS builder

WORKDIR /app


RUN npm install -g pnpm
COPY package*.json ./
COPY prisma ./prisma

RUN pnpm install --ignore-scripts=false

COPY . .
RUN npx prisma generate
RUN pnpm build


#Etapa de producción
FROM node:18

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

RUN pnpm install --prod

EXPOSE 3000

CMD ["npm", "start"]
