const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    surname: { type: String},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active_account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
    birth_day: { type: Date }
});

const accountSchema = new mongoose.Schema({
    name: { type: String, default: "My account" },
    balance: { type: Number, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const transactionSchema = new mongoose.Schema({
    acc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String },
    value: { type: Number, required: true },
    type: { type: String, enum: ['income', 'cost'], required: true },
    category: { type: String }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
    User,
    Account,
    Transaction
};
