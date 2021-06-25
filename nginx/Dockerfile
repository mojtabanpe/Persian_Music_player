FROM nginx:alpine

RUN apk add --update nodejs nodejs-npm \
    && npm install -g @angular/cli

WORKDIR /app

COPY musicplayer ./musicplayer


RUN cd musicplayer\
    && npm ci \
    && ng build --prod --base-href /musicplayer/  \
    && mkdir /usr/share/nginx/html/musicplayer \
    && cp -r dist/musicplayer/. /usr/share/nginx/html/musicplayer \
    && cd ..


EXPOSE 81
