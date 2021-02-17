const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require('./config/key');

const port = 5000;

const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose_con = require('mongoose');
mongoose_con.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello Coy Jennings!');
})

app.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            return res.json({ success:false, err:err })
        } else {
            return res.status(200).json({ success: true })
        }
    });
})

app.listen(port, () => {
    console.log(`boiler-plate Running at ${port}`);
})