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
        // GET current value of the password input field
        const password = passwordInput.value;
        // let a variable track to make sure if all the rules are valid
        let valid = true;

        // check if the rules are invalid or valid
        for (const ruleName in passwordRules) {
            const rule = passwordRules[ruleName];
            if (rule.regex.test(password)) {
                // if input matches all rules: valid
                rule.element.classList.add('valid');
                rule.element.classList.remove('invalid');
            } else {
                // if input does not match one rule or more: invalid
                rule.element.classList.add('invalid');
                rule.element.classList.remove('valid');
                valid = false;
            }
        }
        // set a message for invalid inputs
        passwordInput.setCustomValidity(valid ? '' : 'Password does not meet all requirements');
    });

    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the values of the username and password input fields
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check if the password input field is valid
        if (passwordInput.checkValidity()) {
            // If valid, display a welcome message and show the dashboard
            message.textContent = `Welcome, ${username}!`;
            message.style.color = 'green';
            loginContainer.style.display = 'none';
            dashboardContainer.style.display = 'block';
        } else {
            // If not valid, display an error message
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
    const projectsList = document.getElementById('projects');
    const logoutButton = document.getElementById('logoutButton');

    // Event listener for project form submission
    projectForm.addEventListener('submit', (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the value of the project name input field
        const projectName = projectNameInput.value;

        // Add the new project to the project list
        const projectItem = document.createElement('li');
        projectItem.textContent = projectName;
        projectsList.appendChild(projectItem);

        // Clear the project name input field
        projectNameInput.value = '';
    });

    // Event listener for logout button
    logoutButton.addEventListener('click', () => {
        // Clear the project list
        projectsList.innerHTML = '';

        // Show the login container and hide the dashboard
        loginContainer.style.display = 'block';
        dashboardContainer.style.display = 'none';
        message.textContent = '';
    });
});
