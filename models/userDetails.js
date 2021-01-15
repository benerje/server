// . Employee ID
//       . Start Time
//       . End Time
//       . Date
//       . descriptions
//       . [Notes]
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const timeSheetSchema = new mongoose.Schema({
           EmployeeId:{
            type:ObjectId,
            ref:"User",
           },
            startTime:{
                type:String,
                require:false,
             },
             endTime:{
                type:String,
                require:false,
             },
             date:{
                type:String,
                require:true,
             },
             description:{
                type:String,
                require:false,
             },
             notes:{
                type:String,
                require:false,
             },
    
})

mongoose.model("TimeSheet",timeSheetSchema)