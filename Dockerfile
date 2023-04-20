FROM node:18.15.0

WORKDIR /

COPY package.json .

RUN npm install

COPY / .

EXPOSE 4000

CMD ["node", "app.js"]