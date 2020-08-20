FROM node:12

MAINTAINER Hyunseok CHOI <hschoi1104@gmail.com>

RUN mkdir -p /app

WORKDIR /app

ADD . /app

RUN npm install

ENV NODE_ENV development

EXPOSE 3000

CMD ["npm", "start"]