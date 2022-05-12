FROM node:latest

WORKDIR /usr/src/app/vue-app

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]