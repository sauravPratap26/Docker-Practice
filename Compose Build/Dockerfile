FROM node:24.16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production
ENV REDIS_URL=redis://localhost:6379
ENV POSTGRES_URL=postgres://admin:password@localhost:5432/trialDB

EXPOSE 3000

CMD ["npm", "start"]