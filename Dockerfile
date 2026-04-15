FROM node:22-slim

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

COPY . .

ENV NODE_ENV=production
WORKDIR /app/server

EXPOSE 3000

CMD ["npm", "start"]
