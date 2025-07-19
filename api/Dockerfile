# Backend Dockerfile - PHP 8.2 + Apache
# Compatible with GoDaddy shared hosting environment

# Development stage
FROM php:8.2-apache AS development

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    mariadb-client \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Enable Apache modules
RUN a2enmod rewrite headers ssl

# Set working directory
WORKDIR /var/www/html

# Copy composer files
COPY composer*.json ./

# Install PHP dependencies
RUN composer install --no-scripts --no-autoloader

# Copy application code
COPY . .

# Generate autoloader
RUN composer dump-autoload --optimize

# Set proper permissions (GoDaddy compatible)
RUN chown -R www-data:www-data /var/www/html \
    && find /var/www/html -type d -exec chmod 755 {} \; \
    && find /var/www/html -type f -exec chmod 644 {} \;

# Copy Apache configuration
COPY docker/apache.conf /etc/apache2/sites-available/000-default.conf

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]

# Production stage
FROM development AS production

# Remove development tools
RUN composer install --no-dev --optimize-autoloader

# Production-specific configurations
COPY docker/php.ini /usr/local/etc/php/conf.d/99-app.ini

# Disable error display for production
RUN echo "display_errors = Off" >> /usr/local/etc/php/conf.d/99-app.ini \
    && echo "log_errors = On" >> /usr/local/etc/php/conf.d/99-app.ini

# Testing stage
FROM development AS testing

# Install additional testing tools
RUN apt-get update && apt-get install -y \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-install pdo_sqlite

# Install testing dependencies
RUN composer install --dev

# Run tests
CMD ["./vendor/bin/phpunit"]