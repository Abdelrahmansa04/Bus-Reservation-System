const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

// redis

const jwt = require("jsonwebtoken");

//////////////////

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Uses environment variable
        pass: process.env.EMAIL_PASS  
    }
});
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit code
}
const sendVerificationEmail = async (email, res) => {
    const verificationCode =generateVerificationCode(); // Generate 6-digit code
  
    res.cookie('emailVerification', verificationCode, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000, // Cookie expires in 10 minutes
      signed: true, // Prevent tampering
    });
  
    await transporter.sendMail({
      from: `"Bus Reservation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
    });
  
    return verificationCode;
};

/////////////////////

router.post("/verify-email", async (req, res) => {
    try {
        // const { email, code } = req.body; // This is coming from the frontend!

        // const user = await User.findOne({ email });

        // if (!user) return res.status(404).json({ message: "User not found" });

        // if (user.verified) return res.status(400).json({ message: "Email already verified" });

        // if (user.verificationCode !== code) {
        //     return res.status(400).json({ message: "Invalid verification code." });
        // }

        // // Mark user as verified
        // user.verified = true;
        // user.verificationCode = null; // Clear the code
        // await user.save();

        // res.json({ message: "Email verified successfully!" });
      
        const { token, code } = req.body;
        console.log(token)
        console.log(String(code))
        // Decode the JWT
        const tempUser = jwt.verify(token, "ARandomStringThatIsHardToGuess12345");
        console.log(String(tempUser.verificationCode))
        // Validate the verification code
        if (String(tempUser.verificationCode) !== String(code)) {
            return res.status(400).json({ message: "Invalid verification code." });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(tempUser.password, 10);

        // Save the verified user in MongoDB
        const newUser = new User({
            name: tempUser.name,
            phoneNumber: tempUser.phoneNumber,
            email: tempUser.email,
            password: hashedPassword,
            verified: true
        });

        await newUser.save();

        res.json({ message: "Email verified successfully! You can now log in." });
    } catch (error) {
        res.status(500).json({ message: "Error verifying email", error: error.message });
    }
});


router.post('/resend-code', async (req, res) => {
    const { token } = req.body;
    
    try {
        // Verify the token
        const tempUser = jwt.verify(token, "ARandomStringThatIsHardToGuess12345");

        // Generate a new verification code
        const newVerificationCode = generateVerificationCode();
        
        // Create a new token with the updated verification code
        const newToken = jwt.sign(
            { 
                name: tempUser.name,
                phoneNumber: tempUser.phoneNumber,
                email: tempUser.email,
                password: tempUser.password,
                verificationCode: newVerificationCode
            }, 
            "ARandomStringThatIsHardToGuess12345", 
            { expiresIn: "10m" }
        );
       
        // Send the new verification code via email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: tempUser.email,
            subject: "Verify Your Email",
            html: `<p>Your new verification code is: <strong>${newVerificationCode}</strong></p>`,
        });
        
        // Respond with success message & return new token
        res.json({ message: 'New verification code sent!', newToken });

    } catch (err) {
        res.status(500).json({ message: 'Error sending new verification code', error: err.message });
    }
});

router.post('/register', async (req , res) => {
    // const {email,password} = req.body;
    // userModel.findOne({email})
    // .then(userExist => {
    //     if(userExist){
    //         res.json("email already exists")
    //     }else{ 
    //         userModel.create(req.body)
    //         .then(userNew => res.json(userNew))
    //         .catch(err => res.json(err))
    //         res.json("succsse")
    //     }
    
    // })
    // .catch(err => res.json(err))

    const { name,phoneNumber, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateVerificationCode();

        // Create new user as unverified
        
        // const newUser = new User({
        //     name,
        //     phoneNumber,
        //     email,
        //     password: hashedPassword,
        //     verified: false,
        //     verificationCode: verificationCode, // Save code in DB
        // });
        
        // await newUser.save();
        
        // Send verification email
        
        // res.cookie('tempUser', JSON.stringify({ name, phoneNumber, email, password, verificationCode }), {
        //     httpOnly: true,
        //     maxAge: 100 * 60 * 1000, // Cookie expires in 10 minutes
        //     signed: true
        // });
        
        // req.session.tempUser = {
        //     name,
        //     phoneNumber,
        //     email,
        //     password, // Not hashed yet!
        //     verificationCode
        // };

        const token = jwt.sign({ name, phoneNumber, email, password, verificationCode }, "ARandomStringThatIsHardToGuess12345", { expiresIn: "10m" });


        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
        });
        res.status(201).json({ 
            message: "Registration successful! Check your email for verification.", 
            token: token 
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
})


module.exports = router;