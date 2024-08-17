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

// Rota para obter todos os funcionários
app.get('/api/funcionarios', (req, res) => {
    console.log('Request received for /api/funcionarios'); // Log para verificar se a requisição está sendo recebida
    connection.query('SELECT * FROM Funcionarios', (err, results) => {
        if (err) {
            console.error('Erro ao buscar funcionários:', err);
            res.status(500).json({ error: 'Erro ao buscar funcionários' });
        } else {
            console.log('Funcionários encontrados:', results); // Log para verificar os dados retornados
            res.json(results);
        }
    });
});

// Nova rota para receber dados RFID e inseri-los no banco de dados
app.post('/api/rfid', (req, res) => {
    const rfid = req.body.rfid;

    if (!rfid) {
        return res.status(400).json({ error: 'Nenhum dado RFID recebido' });
    }

    // Consulta SQL para inserir dados no banco
    const sql = 'INSERT INTO RFID_Log (rfid_uid) VALUES (?)';
    connection.query(sql, [rfid], (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados RFID:', err);
            return res.status(500).json({ error: 'Erro ao inserir dados RFID' });
        }

        console.log('Dados RFID inseridos com sucesso:', results);
        res.json({ success: true, id: results.insertId });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
