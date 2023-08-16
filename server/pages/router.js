const express = require('express')
const User = require('../auth/User')
const cors = require('cors')
const router = express.Router()


router.get('/getUser', async(req, res) => {
    console.log(req.user);
    res.send(req.user)
})

router.get("/users", cors(), async(req, res) => {
    const users = await User.find()
    res.json(users);
});

// router.get('/login', async(req, res) => {
//     res.render('login.ejs', {user: req.user ? req.user: {}})
// })

// router.get('/register', (req, res) => {
//     res.render('register.ejs', {user: req.user ? req.user: {}})
// })

module.exports = router