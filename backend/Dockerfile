FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY .env .

RUN npm install

COPY . .

RUN npm install -g @nestjs/cli
RUN npx prisma generate

CMD ["npm", "run", "start"]
