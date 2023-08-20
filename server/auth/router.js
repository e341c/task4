const express = require('express')
const router = express.Router()
const { signUp, signIn, signOut } = require('./controller')


router.post('/api/signup', signUp)
router.post('/api/signin', signIn)
router.get('/api/signout', signOut)

module.exports = router