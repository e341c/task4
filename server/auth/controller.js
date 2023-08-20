const User = require("./User");
const bcrypt = require("bcrypt");

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
    const token = req.user.token;
    res.cookie("access_token", token, {
        sameSite: 'none',
        secure: true,
    }).status(200).json(req.user);
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
