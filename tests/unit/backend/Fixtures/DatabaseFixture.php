<?php

namespace Tests\Unit\Backend\Fixtures;

use PDO;
use PDOException;

/**
 * Database fixture for testing
 */
class DatabaseFixture
{
    private static ?PDO $connection = null;

    /**
     * Get test database connection
     *
     * @return PDO
     */
    public static function getConnection(): PDO
    {
        if (self::$connection === null) {
            try {
                self::$connection = new PDO('sqlite::memory:');
                self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::createTables();
            } catch (PDOException $e) {
                throw new \RuntimeException('Failed to create test database: ' . $e->getMessage());
            }
        }

        return self::$connection;
    }

    /**
     * Create test database tables
     *
     * @return void
     */
    private static function createTables(): void
    {
        $sql = [
            'CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(20) DEFAULT "admin",
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )',
            'CREATE TABLE pages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL UNIQUE,
                content TEXT,
                meta_title VARCHAR(255),
                meta_description TEXT,
                status VARCHAR(20) DEFAULT "draft",
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )',
            'CREATE TABLE services (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                image_url VARCHAR(255),
                price DECIMAL(10,2),
                status VARCHAR(20) DEFAULT "active",
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )',
            'CREATE TABLE locations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255) NOT NULL,
                address TEXT,
                phone VARCHAR(20),
                email VARCHAR(100),
                latitude DECIMAL(10,8),
                longitude DECIMAL(11,8),
                status VARCHAR(20) DEFAULT "active",
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )',
            'CREATE TABLE media (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename VARCHAR(255) NOT NULL,
                original_name VARCHAR(255) NOT NULL,
                mime_type VARCHAR(100) NOT NULL,
                size INTEGER NOT NULL,
                path VARCHAR(500) NOT NULL,
                alt_text VARCHAR(255),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )'
        ];

        foreach ($sql as $query) {
            self::$connection->exec($query);
        }
    }

    /**
     * Reset database to clean state
     *
     * @return void
     */
    public static function reset(): void
    {
        if (self::$connection !== null) {
            $tables = ['users', 'pages', 'services', 'locations', 'media'];
            foreach ($tables as $table) {
                self::$connection->exec("DELETE FROM {$table}");
            }
        }
    }

    /**
     * Seed test data
     *
     * @return void
     */
    public static function seed(): void
    {
        $connection = self::getConnection();

        // Seed users
        $connection->exec("
            INSERT INTO users (username, email, password_hash, role) VALUES 
            ('admin', 'admin@naser.com.mx', '" . password_hash('admin123', PASSWORD_DEFAULT) . "', 'admin'),
            ('editor', 'editor@naser.com.mx', '" . password_hash('editor123', PASSWORD_DEFAULT) . "', 'editor')
        ");

        // Seed pages
        $connection->exec("
            INSERT INTO pages (title, slug, content, meta_title, meta_description, status) VALUES 
            ('Inicio', 'inicio', '<h1>Bienvenidos a Grupo Naser</h1>', 'Grupo Naser - Servicios Funerarios', 'Servicios funerarios de calidad en México', 'published'),
            ('Servicios', 'servicios', '<h1>Nuestros Servicios</h1>', 'Servicios Funerarios - Grupo Naser', 'Conoce todos nuestros servicios funerarios', 'published'),
            ('Contacto', 'contacto', '<h1>Contáctanos</h1>', 'Contacto - Grupo Naser', 'Ponte en contacto con nosotros', 'published')
        ");

        // Seed services
        $connection->exec("
            INSERT INTO services (name, description, price, status) VALUES 
            ('Servicio Básico', 'Servicio funerario básico con todo lo necesario', 15000.00, 'active'),
            ('Servicio Premium', 'Servicio funerario premium con servicios adicionales', 25000.00, 'active'),
            ('Cremación', 'Servicio de cremación completo', 12000.00, 'active')
        ");

        // Seed locations
        $connection->exec("
            INSERT INTO locations (name, address, phone, email, status) VALUES 
            ('Sucursal Aragón', 'Av. Aragón 123, Ciudad de México', '55-1234-5678', 'aragon@naser.com.mx', 'active'),
            ('Sucursal Morelos', 'Calle Morelos 456, Ciudad de México', '55-2345-6789', 'morelos@naser.com.mx', 'active'),
            ('Sucursal Oaxaca', 'Av. Oaxaca 789, Ciudad de México', '55-3456-7890', 'oaxaca@naser.com.mx', 'active')
        ");
    }
}