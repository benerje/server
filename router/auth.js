const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require('../keys')
const requireLogin = require("../middleware/requireLogin")

// router.get('/home',requireLogin,(req,res)=>{
//     res.send("hello user")
// })

router.post('/createemployee',(req,res)=>{
    const {employeeid,name,email,password,confirm_password,role,documents} = req.body
    if(!employeeid || !email || !password ||!name ||!confirm_password || !role){
        return res.status(422).json({error:"Please add all the fields"})
    }
    if(password!==confirm_password){
        return res.status(422).json({error:"Password must be the same"})
    }
    bcrypt.hash(password,12).then(hashedpassword=>{
        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:"User already exists with that email"})
            }
            const user = new User({
                email,
                password:hashedpassword,
                name,
                employeeid,
                role,
                documents
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch((err)=>{
                console.log(err)
            })
    })
   
    }).catch((err)=>{
        console.log(err)
    })
    
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please provide all the details"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router