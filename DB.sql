-- Criação do banco de dados
CREATE DATABASE loginDB;

-- Seleciona o banco de dados para usar
USE loginDB;

-- Criação da tabela de logins
CREATE TABLE logins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL, -- Armazenar senha de forma segura é recomendado
    isAdmin BOOLEAN DEFAULT FALSE,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de funcionários
CREATE TABLE Funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    numero_registro TINYINT UNSIGNED NOT NULL,
    setor VARCHAR(50) NOT NULL,
    UNIQUE (numero_registro) -- Garantir que o número de registro seja único
);

-- Criação da tabela RFID_Log com referência ao número de registro, coluna de aprovação e data_hora
CREATE TABLE RFID_Log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rfid_uid VARCHAR(255) NOT NULL,
    numero_registro TINYINT UNSIGNED,
    aprovado BOOLEAN DEFAULT FALSE,
    data_hora DATETIME, -- Adiciona a coluna data_hora para armazenar data e hora manualmente
    FOREIGN KEY (numero_registro) REFERENCES Funcionarios(numero_registro)
);

-- Inserção de dois registros na tabela de logins
INSERT INTO logins (username, password, isAdmin) VALUES 
('aaa', 'aaa', TRUE),
('bbb', 'bbb', FALSE);

-- Inserção de vários registros na tabela Funcionarios
INSERT INTO Funcionarios (nome, numero_registro, setor) VALUES 
('Ana Silva', 101, 'Recursos Humanos'),
('Carlos Pereira', 102, 'Financeiro'),
('Mariana Oliveira', 103, 'TI'),
('Julio Madeira', 104, 'TI'),
('Neymar Junior', 105, 'Marketing'),
('Fernando Luiz', 106, 'Logística'),
('Felipe Martins', 107, 'Recursos Humanos'),
('Luana Lima', 108, 'Financeiro'),
('Rafael Pereira', 109, 'Marketing'),
('Beatriz Silva', 110, 'Logística'),
('Eduardo Castro', 111, 'TI'),
('Larissa Fernandes', 112, 'Recursos Humanos'),
('Gustavo Oliveira', 113, 'Financeiro'),
('Roberta Almeida', 114, 'Marketing'),
('Vinícius Carvalho', 115, 'Logística');

-- Inserção de vários registros na tabela RFID_Log com UIDs em formato hexadecimal e números de registro em ordem aleatória
INSERT INTO RFID_Log (rfid_uid, numero_registro, aprovado, data_hora) VALUES
('0401A2B3C4F8', 106, FALSE, '2024-08-23 10:45:20'),
('0401A2B3C4F2', 103, TRUE, '2024-08-23 11:10:32'),
('0401A2B3C4F4', 110, TRUE, '2024-08-23 11:45:59'),
('0401A2B3C4F6', 101, FALSE, '2024-08-23 13:00:01'),
('0401A2B3C4F3', 107, FALSE, '2024-08-23 13:30:22'),
('0401A2B3C4F9', 105, TRUE, '2024-08-23 14:00:33'),
('0401A2B3C4F5', 108, FALSE, '2024-08-23 14:30:44'),
('0401A2B3C4F7', 102, TRUE, '2024-08-23 15:02:55'),
('0401A2B3C4FA', 109, FALSE, '2024-08-23 15:30:01'),
('0401A2B3C4FB', 104, FALSE, '2024-08-23 16:00:20'),
('0401A2B3C4FG', 106, TRUE, '2024-08-23 16:30:35'), 
('0401A2B3C4FO', 110, TRUE, '2024-08-23 17:00:45'), 
('0401A2B3C4FE', 102, FALSE, '2024-08-23 17:30:50'), 
('0401A2B3C4FN', 105, FALSE, '2024-08-23 18:00:55'), 
('0401A2B3C4F0', 101, FALSE, '2024-08-23 18:30:15'); 


