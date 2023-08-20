const express = require('express')
const session = require('express-session')
const mongooseStore = require('connect-mongo')
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require("dotenv").config();

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    name: 'task4.session',
    secret: 'keyboard cat',
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,
    cookie: { secure: true },
    store: mongooseStore.create({
        mongoUrl: 'mongodb://localhost:27017'
    })
}))
app.use(cookieParser())

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

require('./config/db.js')
require('./config/passport.js')

app.use(passport.initialize())
app.use(passport.session())

app.use(require('./routes/router.js'))
app.use(require('./auth/router.js'))

const { API_PORT } = process.env;

app.listen(API_PORT, () => {
    console.log(`Server listening on port ${API_PORT}`);
})