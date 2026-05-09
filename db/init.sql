CREATE DATABASE IF NOT EXISTS acme_erp;
USE acme_erp;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);

INSERT INTO productos (nombre, descripcion, precio, stock) VALUES 
('Martillo', 'Martillo de acero con mango de goma', 5500.00, 50),
('Clavos 2 pulgadas', 'Caja de clavos de acero', 1200.00, 200);