// DOM has to fully load in order to run the script
document.addEventListener('DOMContentLoaded', () => {
    // GET password input field element
    const passwordInput = document.getElementById('password');
    // GET form element
    const form = document.getElementById('authForm');
    // GET the message display element
    const message = document.getElementById('message');
    // GET the toggle password visibility checkbox
    const togglePassword = document.getElementById('togglePassword');

    // creating rules for password validation with corresponding elements and regex patterns
    const passwordRules = {
        length: { regex: /.{8,}/, element: document.getElementById('rule1') },
        uppercase: { regex: /[A-Z]/, element: document.getElementById('rule2') },
        lowercase: { regex: /[a-z]/, element: document.getElementById('rule3') },
        number: { regex: /[0-9]/, element: document.getElementById('rule4') },
        special: { regex: /[!@#$%^&*]/, element: document.getElementById('rule5') },
    };

    // event listener for any input changes in the password field
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

    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (passwordInput.checkValidity()) {
            message.textContent = `Welcome, ${username}!`;
            message.style.color = 'green';
            loginContainer.style.display = 'none';
            dashboardContainer.style.display = 'block';
        } else {
            message.textContent = 'Password does not meet the requirements.';
            message.style.color = 'red';
        }
    });

    // Event listener for toggling the password visibility
    togglePassword.addEventListener('change', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
    });

    // GET the elements for the project management functionality
    const loginContainer = document.getElementById('loginContainer');
    const dashboardContainer = document.getElementById('dashboardContainer');
    const projectForm = document.getElementById('projectForm');
    const projectNameInput = document.getElementById('projectName');
    const projectPriority = document.getElementById('projectPriority');
    const projectCompleted = document.getElementById('projectCompleted');
    const projectsList = document.getElementById('projects');
    const logoutButton = document.getElementById('logoutButton');

    // Event listener for project form submission
    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const projectName = projectNameInput.value;
        const projectPriorityValue = projectPriority.value;
        const projectIsCompleted = projectCompleted.checked;

        const projectItem = document.createElement('li');
        projectItem.textContent = projectName;

        // Set the priority class based on the selected priority
        switch (projectPriorityValue) {
            case 'high':
                projectItem.classList.add('high-priority');
                break;
            case 'medium':
                projectItem.classList.add('medium-priority');
                break;
            case 'low':
                projectItem.classList.add('low-priority');
                break;
        }

        // Check if the project is marked as completed
        if (projectIsCompleted) {
            projectItem.classList.add('completed-task');
        }

        projectsList.appendChild(projectItem);

        // Clear the project name input field and reset the form
        projectNameInput.value = '';
        projectForm.reset(); // Resets the entire form including priority and checkbox
    });

    // Event listener for logout button
    logoutButton.addEventListener('click', () => {
        projectsList.innerHTML = '';
        loginContainer.style.display = 'block';
        dashboardContainer.style.display = 'none';
        message.textContent = '';
    });
});
