const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Simulated database as an object
const users = {};

// Endpoint to handle user registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters.');
    }
    try {
        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        // Store the user with the hashed password
        users[username] = hashedPassword;
        res.status(201).send('User registered successfully.');
    } catch (error) {
        res.status(500).send('Error registering user.');
    }
});

// Endpoint to handle user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userHashedPassword = users[username];
    
    if (!userHashedPassword) {
        return res.status(401).send('User not found.');
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, userHashedPassword);
    if (match) {
        res.send('Login successful.');
    } else {
        res.status(401).send('Password is incorrect.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
