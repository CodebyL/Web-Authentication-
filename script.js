document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const form = document.getElementById('authForm');
    const message = document.getElementById('message');
    const togglePassword = document.getElementById('togglePassword');

    const passwordRules = {
        length: { regex: /.{8,}/, element: document.getElementById('rule1') },
        uppercase: { regex: /[A-Z]/, element: document.getElementById('rule2') },
        lowercase: { regex: /[a-z]/, element: document.getElementById('rule3') },
        number: { regex: /[0-9]/, element: document.getElementById('rule4') },
        special: { regex: /[!@#$%^&*]/, element: document.getElementById('rule5') },
    };

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let valid = true;

        for (const ruleName in passwordRules) {
            const rule = passwordRules[ruleName];
            if (rule.regex.test(password)) {
                rule.element.classList.add('valid');
                rule.element.classList.remove('invalid');
            } else {
                rule.element.classList.add('invalid');
                rule.element.classList.remove('valid');
                valid = false;
            }
        }
        passwordInput.setCustomValidity(valid ? '' : 'Password does not meet all requirements');
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Hash the password using bcrypt (Simulated here, actual hashing would be on the server-side)
        const hashedPassword = await hashPassword(password);

        if (passwordInput.checkValidity() && password.length >= 8) {
            // Log in the user (Simulated)
            message.textContent = `Welcome, ${username}! Your password hash is: ${hashedPassword}`;
            message.style.color = 'green';
            loginContainer.style.display = 'none';
            dashboardContainer.style.display = 'block';
        } else {
            message.textContent = 'Password must be at least 8 characters and meet all requirements.';
            message.style.color = 'red';
        }
    });

    togglePassword.addEventListener('change', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
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

    // Simulated function to hash a password using bcrypt (Actual implementation would be server-side)
    async function hashPassword(password) {
        const saltRounds = 10;
        // This is a simulated hash for demonstration. In a real app, use bcrypt on the server to hash passwords.
        return 'hashed_' + password;
    }
});
