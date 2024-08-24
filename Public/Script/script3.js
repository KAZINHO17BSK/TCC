// Função para formatar a data e a hora para um formato mais legível
function formatDateTime(dateTimeString) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 24-hour format
        timeZone: 'America/Sao_Paulo' // Ajusta para o fuso horário local (ajuste conforme necessário)
    };
    const date = new Date(dateTimeString);
    return date.toLocaleString('pt-BR', options);
}

// Função para buscar dados RFID da API
async function fetchRFIDData() {
    try {
        const response = await fetch('/api/rfid');
        if (!response.ok) {
            throw new Error('Erro ao buscar dados RFID: ' + response.statusText);
        }
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar dados RFID');
    }
}

// Função para popular a tabela com os dados recebidos
function populateTable(data) {
    const tableBody = document.querySelector('#rfidTable tbody');
    tableBody.innerHTML = ''; // Limpa o corpo da tabela

    data.forEach(item => {
        const row = document.createElement('tr');

        // Define a cor para a célula de aprovação
        const aprovadoColor = item.aprovado ? 'green' : 'red';

        // Formata a data e a hora
        const formattedDateTime = formatDateTime(item.data_hora);

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.rfid_uid}</td>
            <td>${item.numero_registro}</td>
            <td style="color: ${aprovadoColor};">${item.aprovado ? 'Sim' : 'Não'}</td> <!-- Adiciona a coluna de aprovação com cor direta -->
            <td>${formattedDateTime}</td> <!-- Adiciona a coluna de data e hora formatada -->
        `;

        tableBody.appendChild(row);
    });
}

// Chama a função para buscar os dados quando a página carrega
document.addEventListener('DOMContentLoaded', fetchRFIDData);
