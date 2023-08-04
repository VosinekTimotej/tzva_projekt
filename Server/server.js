const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRoutes);

const port = process.env.PORT || 5000;
const atlas_geslo = process.env.ATLAS_GESLO
const url = "mongodb+srv://Rok:"+ atlas_geslo +"@cluster0.vc1wigh.mongodb.net/TVA";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});


app.get('/test', (req, res) => {
    res.json({ message: 'Server is up and running!' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});