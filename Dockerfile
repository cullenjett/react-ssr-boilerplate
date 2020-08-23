# build ===============================
FROM node:14.8.0 as build

WORKDIR /react-ssr-boilerplate

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# run ===============================
FROM node:14.8.0-alpine as run

WORKDIR /react-ssr-boilerplate

COPY --from=build /react-ssr-boilerplate .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
