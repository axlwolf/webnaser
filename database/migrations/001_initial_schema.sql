-- Initial Database Schema - Grupo Naser CMS
-- Compatible with MySQL 8.0 and GoDaddy hosting

-- Set charset and collation
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content LONGTEXT,
    excerpt TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    status ENUM('published', 'draft', 'pending') DEFAULT 'draft',
    featured_image VARCHAR(500),
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description LONGTEXT,
    short_description TEXT,
    price DECIMAL(10,2),
    category ENUM('funeral', 'cremacion', 'prevencion', 'emergencia') NOT NULL,
    features JSON,
    image VARCHAR(500),
    gallery JSON,
    status ENUM('active', 'inactive') DEFAULT 'active',
    featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(255),
    hours JSON,
    services_available JSON,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    featured_image VARCHAR(500),
    gallery JSON,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_city (city),
    INDEX idx_status (status),
    INDEX idx_coordinates (latitude, longitude)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('general', 'quote', 'emergency') NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message LONGTEXT NOT NULL,
    service_id INT,
    location_id INT,
    urgency ENUM('immediate', 'within_week', 'within_month', 'planning'),
    budget_range ENUM('low', 'medium', 'high', 'premium'),
    preferred_contact ENUM('email', 'phone', 'whatsapp'),
    status ENUM('pending', 'contacted', 'resolved') DEFAULT 'pending',
    notes TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL,
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role ENUM('admin', 'editor', 'viewer') DEFAULT 'editor',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    last_login TIMESTAMP NULL,
    failed_login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create activity log table
CREATE TABLE IF NOT EXISTS activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id INT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_resource (resource_type, resource_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(100) NOT NULL UNIQUE,
    value LONGTEXT,
    type ENUM('string', 'text', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    group_name VARCHAR(50) DEFAULT 'general',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (`key`),
    INDEX idx_group (group_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, email, password_hash, first_name, last_name, role) VALUES 
('admin', 'admin@naser.com.mx', '$2y$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/UnCdrHJ.5oL/qCR36', 'Admin', 'Naser', 'admin')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- Insert default settings
INSERT INTO settings (`key`, value, type, description, group_name) VALUES 
('site_title', 'Grupo Naser - Servicios Funerarios', 'string', 'Título del sitio web', 'general'),
('site_description', 'Servicios funerarios profesionales con más de 30 años de experiencia', 'text', 'Descripción del sitio web', 'general'),
('contact_email', 'info@naser.com.mx', 'string', 'Email principal de contacto', 'contact'),
('contact_phone', '55 5688 7866', 'string', 'Teléfono principal', 'contact'),
('whatsapp_number', '5556887866', 'string', 'Número de WhatsApp', 'contact'),
('address', 'Ciudad de México, México', 'string', 'Dirección principal', 'contact'),
('emergency_available', 'true', 'boolean', 'Servicio de emergencia 24/7', 'services'),
('max_upload_size', '32', 'number', 'Tamaño máximo de subida en MB', 'uploads')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- Insert sample pages
INSERT INTO pages (title, slug, content, excerpt, status) VALUES 
('Inicio', 'inicio', '<h1>Bienvenidos a Grupo Naser</h1><p>Servicios funerarios con más de 30 años de experiencia.</p>', 'Página principal de Grupo Naser', 'published'),
('Nosotros', 'nosotros', '<h1>Sobre Nosotros</h1><p>Somos una empresa familiar con más de 30 años brindando servicios funerarios.</p>', 'Información sobre Grupo Naser', 'published'),
('Contacto', 'contacto', '<h1>Contáctanos</h1><p>Estamos aquí para ayudarte en todo momento.</p>', 'Información de contacto', 'published')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- Insert sample services
INSERT INTO services (name, slug, description, short_description, category, price, features) VALUES 
('Servicio Funerario Básico', 'servicio-funerario-basico', 'Servicio funerario completo con atención personalizada.', 'Servicio básico con todo lo necesario', 'funeral', 15000.00, '["Ataúd básico", "Velación 24 horas", "Traslado", "Trámites legales"]'),
('Cremación Completa', 'cremacion-completa', 'Servicio de cremación con todas las facilidades.', 'Cremación con servicio completo', 'cremacion', 12000.00, '["Cremación", "Urna básica", "Certificados", "Sala de velación"]'),
('Plan de Previsión Familiar', 'plan-prevision-familiar', 'Plan de previsión para proteger a tu familia.', 'Protección familiar garantizada', 'prevencion', 5000.00, '["Cobertura familiar", "Sin límite de edad", "Pagos flexibles", "Activación inmediata"]')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- Insert sample locations
INSERT INTO locations (name, slug, address, city, state, phone, email, services_available) VALUES 
('Sucursal Centro', 'sucursal-centro', 'Av. Principal 123, Col. Centro', 'Ciudad de México', 'CDMX', '55 5688 7866', 'centro@naser.com.mx', '["funeral", "cremacion", "prevencion"]'),
('Sucursal Norte', 'sucursal-norte', 'Av. Norte 456, Col. Lindavista', 'Ciudad de México', 'CDMX', '55 5688 7867', 'norte@naser.com.mx', '["funeral", "cremacion"]')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;