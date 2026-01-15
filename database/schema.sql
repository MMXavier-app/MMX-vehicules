-- Création de la base de données
CREATE DATABASE IF NOT EXISTS mmx_vehicules;
USE mmx_vehicules;

-- Table des véhicules
CREATE TABLE IF NOT EXISTS vehicules (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    type_vehicule VARCHAR(50),
    modele VARCHAR(100) NOT NULL,
    marque VARCHAR(100) NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    date_ajout DATE,
    type_energie VARCHAR(50),
    description TEXT,
    image_url VARCHAR(500),
    INDEX idx_marque (marque),
    INDEX idx_energie (type_energie),
    INDEX idx_date (date_ajout)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des clients
CREATE TABLE IF NOT EXISTS clients (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    type_client VARCHAR(20) DEFAULT 'PARTICULIER',
    societe_mere_id BIGINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (societe_mere_id) REFERENCES clients(id),
    INDEX idx_email (email),
    INDEX idx_type (type_client)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des commandes
CREATE TABLE IF NOT EXISTS commandes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    type_commande VARCHAR(50),
    client_id BIGINT NOT NULL,
    vehicule_id BIGINT NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    etat VARCHAR(50) DEFAULT 'EN_COURS',
    date_commande DATE,
    taux_interet DECIMAL(5,2) NULL,
    duree_mois INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (vehicule_id) REFERENCES vehicules(id),
    INDEX idx_client (client_id),
    INDEX idx_etat (etat),
    INDEX idx_date_cmd (date_commande)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des documents
CREATE TABLE IF NOT EXISTS documents (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    commande_id BIGINT NOT NULL,
    type_document VARCHAR(50) NOT NULL,
    format VARCHAR(10) DEFAULT 'PDF',
    contenu LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (commande_id) REFERENCES commandes(id),
    INDEX idx_commande (commande_id),
    INDEX idx_type (type_document)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des options
CREATE TABLE IF NOT EXISTS options (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    description TEXT,
    incompatibles TEXT,
    INDEX idx_nom (nom)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table de liaison commandes-options
CREATE TABLE IF NOT EXISTS commande_options (
    commande_id BIGINT NOT NULL,
    option_id BIGINT NOT NULL,
    PRIMARY KEY (commande_id, option_id),
    FOREIGN KEY (commande_id) REFERENCES commandes(id),
    FOREIGN KEY (option_id) REFERENCES options(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertion de données de test pour les véhicules
INSERT INTO vehicules (type_vehicule, modele, marque, prix, stock, date_ajout, type_energie, description) VALUES
('AUTO_ESSENCE', 'Clio', 'Renault', 18500.00, 10, '2025-01-01', 'Essence', 'Voiture compacte économique, idéale pour la ville'),
('AUTO_ELECTRIQUE', 'Zoe', 'Renault', 32000.00, 5, '2025-01-15', 'Electrique', 'Voiture électrique citadine avec grande autonomie'),
('SCOOTER_ESSENCE', 'SH 125', 'Honda', 4500.00, 8, '2024-11-01', 'Essence', 'Scooter 125cc économique et fiable'),
('SCOOTER_ELECTRIQUE', 'e-Scooter', 'Peugeot', 3500.00, 12, '2025-02-01', 'Electrique', 'Scooter électrique urbain silencieux'),
('AUTO_ESSENCE', '208', 'Peugeot', 21000.00, 6, '2024-09-01', 'Essence', 'Citadine polyvalente et moderne'),
('AUTO_ELECTRIQUE', 'e-208', 'Peugeot', 35000.00, 4, '2024-12-15', 'Electrique', 'Version électrique de la 208'),
('AUTO_ESSENCE', 'Golf', 'Volkswagen', 28500.00, 3, '2024-08-01', 'Essence', 'Compacte allemande de qualité'),
('SCOOTER_ESSENCE', 'XMAX', 'Yamaha', 7500.00, 7, '2024-10-01', 'Essence', 'Scooter 300cc grand confort'),
('AUTO_ELECTRIQUE', 'Model 3', 'Tesla', 45000.00, 2, '2025-01-20', 'Electrique', 'Voiture électrique haut de gamme'),
('SCOOTER_ELECTRIQUE', 'Niu NQi', 'Niu', 2800.00, 15, '2025-02-10', 'Electrique', 'Scooter électrique connecté');

-- Insertion de données de test pour les clients
INSERT INTO clients (nom, email, telephone, type_client) VALUES
('Dupont Jean', 'jean.dupont@email.com', '0612345678', 'PARTICULIER'),
('Martin Sophie', 'sophie.martin@email.com', '0623456789', 'PARTICULIER'),
('Transport Express', 'contact@transpexpress.com', '0187654321', 'SOCIETE'),
('Auto Services', 'info@autoservices.fr', '0123456789', 'SOCIETE'),
('Durand Pierre', 'pierre.durand@email.com', '0634567890', 'PARTICULIER');

-- Insertion de données de test pour les commandes
INSERT INTO commandes (type_commande, client_id, vehicule_id, montant, etat, date_commande) VALUES
('COMPTANT', 1, 1, 18500.00, 'VALIDE', '2025-01-10'),
('CREDIT', 2, 3, 4500.00, 'EN_COURS', '2025-01-20'),
('COMPTANT', 3, 5, 21000.00, 'LIVREE', '2024-12-15'),
('CREDIT', 4, 9, 45000.00, 'EN_COURS', '2025-02-01');

-- Insertion de données de test pour les options
INSERT INTO options (nom, prix, description, incompatibles) VALUES
('Sièges cuir', 1200.00, 'Sièges en cuir véritable', 'sièges sportifs'),
('Sièges sportifs', 800.00, 'Sièges baquets sportifs', 'sièges cuir'),
('Toit ouvrant', 1500.00, 'Toit panoramique ouvrant', 'barres de toit'),
('Barres de toit', 300.00, 'Barres de toit aluminium', 'toit ouvrant'),
('Peinture métallisée', 600.00, 'Peinture avec effet métallisé', ''),
('Système audio premium', 900.00, 'Système audio haut de gamme', ''),
('Pack sécurité', 700.00, 'Pack sécurité avancée', '');

-- Affichage des tables créées
SELECT 'Tables créées avec succès' as Message;
