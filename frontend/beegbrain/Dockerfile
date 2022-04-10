# Stage 1: Compile and Build angular codebase

FROM node:latest as build

WORKDIR /usr/src/app

COPY . .

#RUN npm install

RUN npm run build

# Stage 2: Serve app with nginx server

FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=build /usr/src/app .

EXPOSE 4200

ENTRYPOINT [ "python3", "manage.py", "runserver", "4200" ]