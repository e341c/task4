const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')

passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
        User.findOne({ email }).then(user => {
            if (user.length == 0) {
                return done(null, false, {
                    message: "Email does not exists",
                });
            }else{
                bcrypt.compare(password, user.password, function (err, result) {
                if (err) { return done(err) }
                if (result) { return done(null, user) }
                else return done(null, false)
            });
            }
        }).catch(e => {
            return done(e)
        })
    }
))

passport.serializeUser(function (user, done) {
    done(null, user._id)
})

passport.deserializeUser(function (id, done) {
    console.log("ID", id);
    User.findById(id).then((user, err) => {
        done(err, user)
    })
})