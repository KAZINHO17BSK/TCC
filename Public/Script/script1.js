fetch('/api/logins')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('loginData');
                data.forEach(login => {
                    const row = document.createElement('tr');
                    const usernameCell = document.createElement('td');
                    const passwordCell = document.createElement('td');
                    const loginTimeCell = document.createElement('td');
                    usernameCell.textContent = login.username;
                    passwordCell.textContent = login.password;
                    passwordCell.classList.add('password-cell');
                    passwordCell.dataset.password = login.password; // Armazena a senha original nos dados do elemento
                    const loginTime = new Date(login.login_time);
                    loginTimeCell.textContent = loginTime.toLocaleString();
                    row.appendChild(usernameCell);
                    row.appendChild(passwordCell);
                    row.appendChild(loginTimeCell);
                    container.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Failed to load data:', error);
                document.getElementById('loginData').textContent = 'Failed to load data';
            });

        document.getElementById('togglePasswordButton').addEventListener('click', function () {
            const passwordCells = document.querySelectorAll('.password-cell');
            passwordCells.forEach(cell => {
                const currentText = cell.textContent;
                const originalPassword = cell.dataset.password; // Obtém a senha original dos dados do elemento
                const isPasswordVisible = currentText === originalPassword;
                cell.textContent = isPasswordVisible ? '********' : originalPassword;
            });
        });