FROM nginx:alpine

RUN apk add --update nodejs nodejs-npm \
    && npm install -g @angular/cli

WORKDIR /app

COPY musicplayer ./musicplayer


RUN cd musicplayer\
    && npm ci \
    && ng build --prod \
    && cp -r dist/musicplayer/. /usr/share/nginx/html


EXPOSE 81
