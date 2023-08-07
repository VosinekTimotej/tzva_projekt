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

// get all transakcije
router.get('/all', async (req, res) => {
    try {
        const transakcije = await Transaction.find();
        res.json(transakcije);
    } catch (error) {
        console.error('Error fetching transakcije:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// transactions for user and acc
router.get('/', verifyToken, async (req, res) => {
    try {
        const user_id = req.userId;
        // const {acc_id} = req.body;
        const acc_id = req.header('Account');
        // console.log(user_id)
        // console.log(acc_id)
        if (!user_id || !acc_id) {
            return res.status(400).json({ error: 'userId and accId are required query parameters' });
        }

        const transakcije = await Transaction.find({ user_id: user_id, acc_id: acc_id });
        res.json({ transakcije });
    } catch (error) {
        console.error('Error getting transakcije:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


// dodajanje nove transakcije
router.post('/', verifyToken, async (req, res) =>{
    try {
        const {acc_id, comment, value, type, category, date} = req.body
        const user_id = req.userId;
        const transakcija = await Transaction.create({
            acc_id: acc_id,
            user_id: user_id,
            comment: comment,
            value: value,
            type: type,
            category: category,
            date: date
        });
        await transakcija.save()

        // update stanje na racun
        const racun = await Account.findOne({_id: acc_id})
        let newStanje = 0;
        if(type=='income'){
            newStanje = parseFloat(racun.balance) + parseFloat(value)
        }
        else{
            newStanje = parseFloat(racun.balance) - parseFloat(value)
        }
        console.log('novo stanje', newStanje)
        if(transakcija){
            data = {
                balance: newStanje
            }
            await Account.findByIdAndUpdate(acc_id, data)
        }

        res.json({ msg: 'Transaction added', transakcija: transakcija});

    } catch (error) {
        console.error('Error creating new transakcije:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;