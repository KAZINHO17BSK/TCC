const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loginDB'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem sucedida ao banco de dados!');
});

// Middleware para processar o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Adicionado para lidar com JSON

// Nova rota para processamento de login
app.post('/submit-form', (req, res) => {
    const { username, password } = req.body;

    // Consulta SQL atualizada para usar a tabela e as colunas corretas
    const sql = 'SELECT * FROM logins WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Erro ao executar consulta SQL:', err);
            res.status(500).json({ error: 'Erro interno ao tentar fazer login' });
            return;
        }

        if (results.length > 0) {
            const user = results[0];
            if (user.isAdmin) {
                res.json({ redirect: '/adm/index.html' }); // Redirecionamento para administrador
            } else {
                res.json({ redirect: '/usuario/index.html' }); // Redirecionamento para usuário
            }
        } else {
            res.status(401).json({ error: 'Usuário ou senha incorretos' });
        }
    });
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para obter todos os logins (se necessário)
app.get('/api/logins', (req, res) => {
    connection.query('SELECT * FROM logins', (err, results) => {
        if (err) {
            console.error('Erro ao buscar logins:', err);
            res.status(500).json({ error: 'Erro ao buscar logins' });
        } else {
            res.json(results);
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
