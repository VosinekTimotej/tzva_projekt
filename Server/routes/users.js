const express = require('express');
const router = express.Router();
const { User, Account, Transaction, Category } = require('../models/Models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

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

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            name,
            surname,
            username,
            password: hashedPassword,
            birth_day,
        });

        // create new acc
        const account = new Account({ balance: 0, name: req.body.name, user_id: newUser._id});
        await account.save();

        // add acc to users array
        newUser.accounts.push(account._id);
        newUser.active_account = account._id;
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
        res.status(201).json({ user: newUser, token, acc: newUser.active_account});
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
        // if (password !== user.password){
        //     return res.status(401).json({ message: 'Invalid username or password' });
        // }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ msg: "Logged in", token, acc: user.active_account});
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

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        if (hashedPassword) {user.password = hashedPassword;}

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

// add existing acc using ID
router.put('/acc/:accId', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const accId = req.params.accId;
        console.log('acc id: ',accId);

        // ce obstaja user
        const user = await User.findById(userId);
        if (!user) {
            console.log('User ne obstaja')
            return res.status(404).json({ error: 'User not found' });
        }

        // ce obstaja acc
        const account = await Account.findById(accId);
        if (!account) {
            console.log('account ne obstaja')
            return res.status(404).json({ error: 'Account not found' });
        }

        // ce ze ima ta acc dodan
        if (user.accounts.includes(accId)) {
            console.log('Ze ima acc')
            return res.status(400).json({ error: 'User already has this account' });
        }

        user.accounts.push(account._id);
        await user.save();
        
        res.json({ msg: 'Acc added to user', account });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// get all acc data for user
router.get('/acc', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const accountIds = user.accounts;
        const accounts = await Account.find({ _id: { $in: accountIds } });

        res.json({ accounts });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// delete acc 
router.delete('/acc', verifyToken, async (req, res)=>{
    try {
        const userId = req.userId;
        const accId = req.query.accId;
        const account = await Account.findOne({ _id: accId, user_id: userId });

        if (!account) {
            return res.status(404).json({ error: 'Account not found or does not belong to the user' });
        }

        // zbrisemo vse transakcije ki so na tem racunu
        await Transaction.deleteMany({ acc_id: accId });

        // zbrisemo racun
        await Account.deleteOne({ _id: accId });

        // odstranimo acc id iz accounts array
        const user = await User.findById(userId);
        user.accounts = user.accounts.filter((accountId) => accountId.toString() !== accId);
        await user.save();

        res.json({ msg: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// categories
// get all categories for testing
router.get('/categories', verifyToken, async (req, res) => {
    try {
        const cat = await Category.find();
        res.json(cat);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// create and add category to user
router.post('/category', verifyToken, async(req,res)=>{
    try {
        const userId = req.userId;
        const { name, max_spend } = req.body;
        console.log(userId)
        console.log(name)
        console.log(max_spend)

        // find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // create new category
        const category = new Category({ name: name, max_spend: max_spend});
        await category.save();

        // add category to users array
        user.categories.push(category._id);
        await user.save();

        res.json({ msg: 'Category added to user', category });

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;