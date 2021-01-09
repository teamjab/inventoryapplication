FROM node:latest

WORKDIR /app

COPY ./ ./

EXPOSE 3000

RUN npm install -y

ENV NODE_ENV=production

CMD ["npm", "run", "start"]