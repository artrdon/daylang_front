FROM node:alpine as build

WORKDIR /daylang_frontend
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /daylang_frontend/dist /usr/share/nginx/html
COPY ./src/static /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]