const express = require('express');
const router = express.Router();
const { User } = require('../models/Models');
const jwt = require('jsonwebtoken');
require('dotenv').config();


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

router.route('/login').post(async (req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        // ali smo dobili username in geslo
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // poiscemo user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        //! SAMO TEMP DOKLER NE NAREDIMO HASHING
        if (password !== user.password){
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ msg: "Logged in", token});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;