document.getElementById('loginForm').addEventListener('submit', function (event) {
event.preventDefault();

const formData = new FormData(this);
const data = new URLSearchParams(formData);

fetch('http://localhost:3000/insert-login', {
method: 'POST',
body: data,
})
.then(response => response.json())
.then(result => {
if (result.success) {
alert('Login registrado com sucesso!');
window.location.href = '../PG/index.html';
} else {
alert('Erro ao registrar login: ' + result.message);
}
})
.catch(error => {
alert('Erro ao enviar o formulário: ' + error.message);
});
});