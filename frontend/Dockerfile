FROM node:20

WORKDIR /daylang_frontend
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]