const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const userModel = require('./models/users')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/users");

app.post('/login', (req,res)=> {
    const {email,password} = req.body;
    userModel.findOne({email:email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("success")
            }else{
                res.json("the password is incorrect")
            }
        }else{
            res.json("this email is not exist")
        }
    })
})

app.post('/register',(req , res) => {
    const {email} = req.body;
    userModel.findOne({email})
    .then(userExist => {
        if(userExist){
            res.json("email already exists")
        }else{ 
            userModel.create(req.body)
            .then(userNew => res.json(userNew))
            .catch(err => res.json(err))
            res.json("succsse")
        }
    
    })
    .catch(err => res.json(err))
})

app.listen(3001 , () =>{
    console.log("sever is running")
})