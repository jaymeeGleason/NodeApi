FROM node:16

WORKDIR /usr/src/app

COPY ["package*.json",".env","./"]
COPY ./src ./src
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]