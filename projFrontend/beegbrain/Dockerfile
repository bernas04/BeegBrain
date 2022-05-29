# stage 1

FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN npm i && npm run build

# stage 2

FROM nginx:alpine

COPY --from=build /app/dist/beegbrain /usr/share/nginx/html

EXPOSE 4200