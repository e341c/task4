const express = require('express')
const passport = require('passport')
const app = express()
const {signUp, signIn, signOut, block, unblock, deleteUser} = require('./controller')

app.post('/api/signup', signUp)
app.post('/api/signin', passport.authenticate('local', {failureRedirect : false,failureMessage: true }), signIn)
app.get('/api/signout', signOut)
app.post('/api/block/:id', block)
app.post('/api/unblock/:id', unblock)
app.delete('/api/delete/:id', deleteUser)

module.exports = app