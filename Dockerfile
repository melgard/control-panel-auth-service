FROM node:carbon

MAINTAINER info.pcmas@gmail.com

# Create app directory
WORKDIR /app

RUN npm install nodemon -g

COPY package.json /app

RUN npm install

COPY . /app

CMD [ "npm", "start" ]

EXPOSE 3000