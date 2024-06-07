const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

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

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/insert-login', (req, res) => {
    const { username, password } = req.body;

    connection.query('INSERT INTO logins (username, password) VALUES (?, ?)', [username, password], (err, result) => {
        if (err) {
            console.error('Erro ao inserir login:', err);
            res.json({ success: false, message: 'Erro ao registrar login.' });
        } else {
            console.log('Login registrado com sucesso!');
            res.json({ success: true, message: 'Login registrado com sucesso!' });
        }
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});

app.get('/api/logins', (req, res) => {
    connection.query('SELECT * FROM logins', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error fetching logins' });
        } else {
            res.json(results);
        }
    });
});