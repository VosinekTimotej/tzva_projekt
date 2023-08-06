const express = require('express');
const router = express.Router();
const { User, Account, Transaction } = require('../models/Models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// verify if token is valid
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'No token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

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

// login user
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

// update user info
router.put('/update', verifyToken, async (req, res) => {
    try {
        const { name, surname, birth_day } = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (name) {user.name = name;}
        if (surname) {user.surname = surname;}
        if (birth_day) {user.birth_day = birth_day;}

        await user.save();

        res.json({ msg: 'User data updated', user });

    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// update password
router.put('/password', verifyToken, async (req, res) => {
    try{
        const newPassword = req.body.password;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (newPassword) {user.password = newPassword;}

        await user.save();

        res.json({ msg: 'Users password updated', user });
    }
    catch (error) {
        console.error('Error :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// add acc to user
router.put('/acc', verifyToken, async (req, res) => {
    try{
        const userId = req.userId;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // create new acc
        const account = new Account({ balance: 0, name: req.body.name, user_id: userId});
        await account.save();

        // add acc to users array
        user.accounts.push(account._id);
        await user.save();

        res.json({ msg: 'Acc added to user', account });
    }
    catch (error) {
        console.error('Error :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// get all acc data for user
router.get('/acc', verifyToken, async (req, res) => {
    try{
        const userId = req.userId;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const accounts = await Account.find({ user_id: userId });

        res.json({ accounts });
    }
    catch (error) {
        console.error('Error :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;