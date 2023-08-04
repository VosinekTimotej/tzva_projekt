const express = require('express');
const router = express.Router();
const { User } = require('../models/Models');
const jwt = require('jsonwebtoken');

// get all users for testing
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// register
router.post('/', async (req, res) => {
    try {
        const { name, surname, username, password, birth_day } = req.body;
        const newUser = await User.create({
            name,
            surname,
            username,
            password,
            birth_day,
        });
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
        res.status(201).json({ user: newUser, token});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;