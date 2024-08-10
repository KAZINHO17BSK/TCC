document.addEventListener('DOMContentLoaded', () => {
    loadPresencas();
});

// Função para carregar e exibir a lista de presenças
function loadPresencas() {
    fetch('/api/presencas')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('presenca-list');
            list.innerHTML = '';
            data.forEach(presenca => {
                const listItem = document.createElement('li');
                listItem.textContent = `${presenca.nome} - ${presenca.status} - ${presenca.data}`;
                
                // Botão para marcar como presente
                const presentButton = document.createElement('button');
                presentButton.textContent = 'Marcar como presente';
                presentButton.onclick = () => updatePresenca(presenca.id, 'presente');
                listItem.appendChild(presentButton);
                
                // Botão para marcar como faltou
                const absentButton = document.createElement('button');
                absentButton.textContent = 'Marcar como faltou';
                absentButton.onclick = () => updatePresenca(presenca.id, 'faltou');
                listItem.appendChild(absentButton);
                
                list.appendChild(listItem);
            });
        });
}

// Função para atualizar a presença
function updatePresenca(id, status) {
    fetch(`/api/presencas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    })
    .then(response => response.json())
    .then(() => loadPresencas())
    .catch(error => console.error('Erro ao atualizar presença:', error));
}
