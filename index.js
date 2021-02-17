const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const port = 5000;

const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose_con = require('mongoose');
mongoose_con.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello Elie Orgel!');
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

app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "There is no user on the email list."
            })
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.json({
                        loginSuccess: false,
                        message: "incorrect password"
                    })
                } else {
                    user.generateToken((err, user) => {
                        if (err) {
                            return res.status(400).send(err);
                        } else {
                            // save token cookie
                            res.cookie("x_auth", user.token)
                                .status(200)
                                .json({
                                    loginSuccess: true,
                                    userId: user._id
                                })
                        }
                    })
                }
            })
        }
    })
})

app.listen(port, () => {
    console.log(`boiler-plate Running at ${port}`);
})