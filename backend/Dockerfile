FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm install -g @nestjs/cli
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]
