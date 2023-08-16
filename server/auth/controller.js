const User = require("./User");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
    if(
        req.body.email.length > 0 &&
        req.body.name.length > 0 &&
        req.body.password.length > 0 &&
        req.body.passwordMatch.length > 0
    ){
        const findUser = await User.findOne({ email: req.body.email }).count()
        if (findUser) {
            res.send({message: "User already exists"})
        }
        else if(req.body.password !== req.body.passwordMatch){
            res.send({message: "The passwords does not match"})
        }else{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    new User({
                        email: req.body.email,
                        name: req.body.name,
                        password: hash,
                        createdAt: req.body.createdAt,
                        updatedAt: req.body.updatedAt,
                        status: true
                    }).save()
                    res.send({message: "User successfully created"})
                });
            })
        }

    }else{
        res.send({message: "fill all fields"})
    }
};

const signIn = async (req, res) => {
    res.send({ message: "Successfully Authenticated" });
};

const signOut = async (req, res) => {
    req.logout(function (err) {
        console.log('err', err);
    });
    res.send('logout')
};

const block = async (req, res) => {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId, {status : false})
    res.status(200).send('Blocked')
}

const unblock = async (req, res) => {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId, {status : true})
    res.status(200).send('Unblocked')
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    await User.deleteOne({ _id: userId })
    res.status(200).send('Deleted')
}

module.exports = {
    signUp,
    signIn,
    signOut,
    block,
    unblock,
    deleteUser
};
