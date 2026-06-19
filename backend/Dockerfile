FROM php:8.4-fpm-alpine

RUN apk add --no-cache git unzip nginx supervisor && \
    docker-php-ext-install pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

ENV APP_ENV=prod
RUN composer install --no-dev --optimize-autoloader

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf

# Create a non-root user and give it ownership of the app, nginx and php-fpm directories
RUN addgroup -g 1000 appuser && \
    adduser -D -u 1000 -G appuser appuser && \
    chown -R appuser:appuser /var/www/html /var/lib/nginx /var/log/nginx /run/nginx 2>/dev/null; \
    mkdir -p /var/lib/nginx/tmp /run/nginx && \
    chown -R appuser:appuser /var/lib/nginx /run/nginx /var/log

EXPOSE 8080
CMD ["supervisord", "-c", "/etc/supervisord.conf"]