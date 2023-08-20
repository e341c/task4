const passport = require("passport");
const User = require("../auth/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");

passport.use(
    new LocalStrategy({ usernameField: "email" }, async function (
        email,
        password,
        done
    ) {
        if (email.length >= 1 && password.length >= 1) {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, {
                    message: "Email does not exists",
                });
            }
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        return done(err);
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                user_id: user._id,
                                email: user.email,
                                status: user.status,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt,
                            },
                            process.env.TOKEN_KEY,
                            {
                                expiresIn: "2h",
                            }
                        );
                        user.token = token;
                        return done(null, user);
                    } else return done(null, false);
                });
            }
        } else {
            return done(null, false, { message: "All inputs are required" });
        }
    })
);

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    console.log("ID", id);
    User.findById(id).then((user, err) => {
        done(err, user);
    });
});
