const db = require("./db.js");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
const passport = require('passport')

passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
    User.findOne({ email }).then(user => {
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) { return done(err) }
            if (result) { return done(null, user) }
        });
    }).catch(e => {
        return done(e)
    })
}
))

passport.use(new LocalStrategy({ usernameField: "email" }, function (email, password, done) {
        const querySelect = "SELECT * FROM Users WHERE email = ?";
        db.query(querySelect, [email], (err, user) => {
            if (err) return done(err);
            if (user.length == 0) {
                return done(null, false, {
                    message: "Email does not exists",
                });
            }
            bcrypt.compare(password, user[0].password, (err, response) => {
                if (err) return done(err);
                if (response == true) {
                    return done(null, user[0]);
                } else {
                    return done(null, false, { message: "Incorrect password" });
                }
            });
        });
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const query = "SELECT * FROM Users WHERE id = ?";
    db.query(query, [id], (err, data) => {
        if (err) return done(err);
        if (data.length === 0) {
            return done(null, false);
        }
        const userInfo = {
            id: data[0].id,
            email: data[0].email,
        };
        done(null, userInfo);
    });
});

// passport.deserializeUser(function (id, done) {
//     console.log(id);
//     const query = "SELECT * FROM Users WHERE id = ?";
//     db.query(query, [id], (err, data) => {
//         console.log("ID query", id);
//         if (err) return done(err);
//         const userInfo = {
//             id: data[0].id,
//             email: data[0].email,
//         };
//         done(null, userInfo);
//     });
// });
