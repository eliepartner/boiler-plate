const express = require('express');
const app = express();

const config = require('./config/key');

const port = 5000;

const mongoose_con = require('mongoose');
mongoose_con.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello Coy Jennings!');
})

app.listen(port, () => {
    console.log(`boiler-plate Running at ${port}`);
})