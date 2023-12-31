const express= require('express')
const router =express.Router()
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const User=require('../models/user.js')
const jwtSecret="IamlearningWebDevelopmentfromendtoend"
router.post("/loginuser", async (req, res) => {
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });

        if (!userData) {
            console.log("User not found");
            return res.status(400).json({ errors: "Login with correct credentials" });
        }

        console.log("User found. Comparing passwords...");

       const pwdCompare=await bcrypt.compare(req.body.password,userData.password)
        if (!pwdCompare) {
            console.log("Incorrect password");
            return res.status(400).json({ errors: "Login with correct credentials" });
        }
       const data={
        user:{
            id:userData.id
        }
       }
const authtoken =jwt.sign(data,jwtSecret)
        console.log("Login successful");
        return res.json({ success:true,authtoken:authtoken});
    } catch (error) {
        console.log("Error:", error);
        res.status({ success: false });
    }
});

module.exports = router;