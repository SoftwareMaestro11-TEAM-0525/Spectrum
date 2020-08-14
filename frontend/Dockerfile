FROM node:12

MAINTAINER Hyunseok CHOI <hschoi1104@gmail.com>

RUN mkdir -p /app

WORKDIR /app

ADD . /app

RUN npm install yarn && yarn

ENV NODE_ENV development

EXPOSE 8080

CMD ["yarn", "serve"]