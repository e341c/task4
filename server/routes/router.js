const express = require('express')
const router = express.Router()
const User = require('../auth/User')
const auth = require("../middleware/auth");

router.get('/getuser', auth, async (req, res) => {
    const user = await User.findById(req.user.user_id)
    if(user){
        if(user.status === false){
            res.clearCookie("access_token")
            res.end()
        }else{
            res.status(200).json(user)
        }
    }
})

router.get("/users", async(req, res) => {
    const users = await User.find()
    res.json(users);
});

router.post('/users/block/:id', async (req, res) => {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId, { status: false });
    res.status(200).send("Blocked");
})

router.post('/users/unblock/:id', async (req, res) => {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId, { status: true });
    res.status(200).send("Unblocked");
})

router.delete('/users/delete/:id', async (req, res) => {
    const userId = req.params.id;
    await User.deleteOne({ _id: userId });
    res.status(200).send("Deleted");
})

module.exports = router