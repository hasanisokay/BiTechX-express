const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')

app.use(express.json());
app.use(cors())

let users = [];

// Create a new user
app.post('/users', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.send({ statusL:400, message: 'Both username and password are required.' });
    }
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.send({status:200, newUser});
});

// Read all users
app.get('/users', (req, res) => {
    res.send(users);
});

// Read a single user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params?.id);
    const user = users.find(user => user?.id === userId);
    if (!user) {
        return res.send({ status:404, message: 'User not found.' })
    }
    res.json(user);
});

// Update a user
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params?.id);
    const { username, password } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.send({ status:404, message: 'User not found.' })
    }
    users[userIndex] = { id: userId, username, password };
    res.send(users[userIndex]);
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.send({ status:404, message: 'User not found.' })
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    res.send(deletedUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
