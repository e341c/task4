const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require("dotenv").config();

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser())

app.use(
    cors({
        origin: "https://task4-client-aedr.onrender.com",
        credentials: true,
    })
);

require('./config/db.js')

app.use(require('./auth/router.js'))
app.use(require('./routes/router.js'))

const { API_PORT } = process.env;

app.listen(API_PORT, () => {
    console.log(`Server listening on port ${API_PORT}`);
})