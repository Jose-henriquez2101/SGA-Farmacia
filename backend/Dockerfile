FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .
RUN npm install -g @nestjs/cli
RUN npx prisma generate
RUN npx prisma db push

CMD ["npm", "run", "start"]
