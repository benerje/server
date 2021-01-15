const express = require('express')

const router = express.Router()

const mongoose = require('mongoose')

const requireLogin = require('../middleware/requireLogin')

const TimeSheet = mongoose.model("TimeSheet")
const User = mongoose.model("User")

router.post('/timesheet',requireLogin,(req,res)=>{
    const {startTime,endTime,date,description,notes} = req.body
    if(!startTime || !date){
        return res.status(422).json({error:"Please add required Fields"})
    }
    const timeSheet = new TimeSheet({
        EmployeeId:req.user,
        startTime,
        endTime,
        date,
        description,
        notes,
    })

    timeSheet.save().then(result=>{
        res.json({result})
    })
    .catch(err=>
        console.log(err)
        ) 
})

router.get('/mytimesheet',requireLogin,(req,res)=>{
    TimeSheet.find({EmployeeId:req.user._id})
    .populate("EmployeeId","employeeid name email")
    .then(myTimeSheet=>{
        res.json({myTimeSheet})
        
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router