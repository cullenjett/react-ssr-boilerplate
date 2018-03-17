# build ===============================
FROM node:9 as build

WORKDIR /react-ssr-boilerplate

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# run ===============================
FROM node:9-alpine as run

WORKDIR /react-ssr-boilerplate

COPY --from=build /react-ssr-boilerplate .

EXPOSE 3000

CMD ["npm", "run", "start-prod"]
