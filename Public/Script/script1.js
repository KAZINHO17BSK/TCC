// Script para carregar dados da tabela de funcionários
fetch('/api/funcionarios')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data); // Log para verificar os dados recebidos
        const container = document.getElementById('funcionarioData');
        container.innerHTML = ''; // Limpa o conteúdo existente

        data.forEach(funcionario => {
            const row = document.createElement('tr');
            const nomeCell = document.createElement('td');
            const numeroRegistroCell = document.createElement('td');
            const setorCell = document.createElement('td');

            // Adiciona os dados das células
            nomeCell.textContent = funcionario.nome;
            numeroRegistroCell.textContent = funcionario.numero_registro;
            setorCell.textContent = funcionario.setor;

            // Adiciona as células à linha
            row.appendChild(nomeCell);
            row.appendChild(numeroRegistroCell);
            row.appendChild(setorCell);

            // Adiciona a linha à tabela
            container.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Failed to load data:', error);
        document.getElementById('funcionarioData').textContent = 'Failed to load data: ' + error.message;
    });
