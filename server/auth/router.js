const express = require('express')
const passport = require('passport')
const router = express.Router()
const { signUp, signIn, signOut } = require('./controller')

router.post('/api/signup', signUp)
router.post('/api/signin', passport.authenticate('local', {failureRedirect : false,failureMessage: true }), signIn)
router.get('/api/signout', signOut)

module.exports = router