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

-- Inserção de dois registros na tabela de logins
INSERT INTO logins (username, password, isAdmin) VALUES 
('aaa', 'aaa', TRUE),
('bbb', 'bbb', FALSE);

-- Inserção de três registros na tabela Funcionarios
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