const User = require("./User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    if (
        req.body.email.length > 0 &&
        req.body.name.length > 0 &&
        req.body.password.length > 0 &&
        req.body.passwordMatch.length > 0
    ) {
        const findUser = await User.findOne({ email: req.body.email }).count();
        if (findUser) {
            res.status(409).send("User Already Exist. Please Login");
        } else if (req.body.password !== req.body.passwordMatch) {
            res.status(406).send("Passwords does not match");
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    new User({
                        email: req.body.email,
                        name: req.body.name,
                        password: hash,
                        createdAt: Date(),
                        updatedAt: Date(),
                        status: true,
                    }).save();

                    res.status(201).send("User successfully registered");
                });
            });
        }
    } else {
        res.status(400).send("All inputs are required");
    }
};

const signIn = async (req, res) => {
    if (req.body.email.length >= 1 && req.body.password.length >= 1) {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(409).send("Email does not exists");
        }
        if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (err) {
                        res.status(500).send({ error: "Internal server error." });
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
                                expiresIn: "1h",
                            }
                        );
                        user.token = token;
                        return res.cookie("access_token", token, {
                            sameSite: "none",
                            secure: true,
                        }).status(200).json(user);
                    } else res.status(408).send("Incorrect password")
                }
            );
        }
    } else {
        res.status(400).send("All inputs are required");
    }
};

const signOut = async (req, res) => {
    req.logout(function (err) {
        console.log("err", err);
    });
    res.send("logout");
};

module.exports = {
    signUp,
    signIn,
    signOut,
};
