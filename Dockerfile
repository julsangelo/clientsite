FROM webdevops/php-nginx:8.2-alpine AS base

WORKDIR /var/www/html

ENV WEB_DOCUMENT_ROOT=/var/www/html/public
ENV WEB_DOCUMENT_INDEX=index.php

ENV TZ=Asia/Singapore

#Development Stage
FROM base AS development

RUN apk update && \
    apk add --no-cache \
    composer \
    nodejs \
    npm 

COPY ./supervisor/supervisor-npm.conf /opt/docker/etc/supervisor.d/
COPY ./entrypoints/development.sh /opt/docker/entrypoint/development.sh
RUN chmod +x /opt/docker/entrypoint/development.sh

ENTRYPOINT [ "/opt/docker/entrypoint/development.sh" ]

#Production Stage
FROM base AS production

COPY . .