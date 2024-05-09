document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const form = document.getElementById('authForm');
    const message = document.getElementById('message');
    const togglePassword = document.getElementById('togglePassword');

    togglePassword.addEventListener('change', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Example of sending registration information to the backend
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.text())
        .then(data => {
            message.textContent = data;
            if (data === 'Login successful.') {
                message.style.color = 'green';
                loginContainer.style.display = 'none';
                dashboardContainer.style.display = 'block';
            } else {
                message.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.textContent = 'Failed to communicate with the server.';
            message.style.color = 'red';
        });
    });

    const loginContainer = document.getElementById('loginContainer');
    const dashboardContainer = document.getElementById('dashboardContainer');
    const projectForm = document.getElementById('projectForm');
    const projectNameInput = document.getElementById('projectName');
    const projectsList = document.getElementById('projects');
    const logoutButton = document.getElementById('logoutButton');

    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const projectName = projectNameInput.value;

        const projectItem = document.createElement('li');
        projectItem.textContent = projectName;
        projectItem.style.padding = '10px';
        projectItem.style.borderRadius = '4px';
        projectItem.style.color = '#7D5A8E';
        projectItem.style.fontWeight = 'bold';

        const prioritySelect = document.createElement('select');
        prioritySelect.innerHTML = `
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        `;
        projectItem.appendChild(prioritySelect);

        applyPriorityStyle(projectItem, 'high');

        prioritySelect.addEventListener('change', () => {
            applyPriorityStyle(projectItem, prioritySelect.value);
        });

        projectItem.addEventListener('click', () => {
            if (!projectItem.classList.contains('completed-task')) {
                projectItem.classList.add('completed-task');
                projectItem.style.backgroundColor = '#C7C5CA'; // Color for completed task
                projectItem.style.textDecoration = 'line-through'; // Crosses off the task
            } else {
                projectItem.classList.remove('completed-task');
                projectItem.style.textDecoration = 'none'; // Remove the cross-off
                applyPriorityStyle(projectItem, prioritySelect.value); // Restore priority color
            }
        });

        projectsList.appendChild(projectItem);

        projectNameInput.value = '';
    });

    function applyPriorityStyle(projectItem, priority) {
        projectItem.classList.remove('high-priority', 'medium-priority', 'low-priority');
        switch (priority) {
            case 'high':
                projectItem.style.backgroundColor = '#F8BFBF'; // High Priority
                break;
            case 'medium':
                projectItem.style.backgroundColor = '#F9F3DC'; // Medium Priority
                break;
            case 'low':
                projectItem.style.backgroundColor = '#E1ECE9'; // Low Priority
                break;
        }
        if (!projectItem.classList.contains('completed-task')) {
            projectItem.style.textDecoration = 'none'; // Ensure no line-through unless completed
        }
    }

    logoutButton.addEventListener('click', () => {
        projectsList.innerHTML = '';
        loginContainer.style.display = 'block';
        dashboardContainer.style.display = 'none';
        message.textContent = '';
    });
});
