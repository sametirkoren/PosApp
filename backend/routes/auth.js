const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");


router.post("/register", async (req,res) => {
    try {
        const {username, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        })
        await newUser.save();
        res.status(200).json("User added successfully")
    }
    catch(error){
        res.status(500).json(error);
    }
})


router.post("/login", async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).send({ error: "User not found!" });
          }
        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if(!validPassword){
            res.status(403).send("Invalid password")
        }
        else{
            res.status(200).json(user);
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;