const express  = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000
const {MONGOURI} = require('./keys')

//l8THUS1u1AQnGahF

require('./models/user')

app.use(express.json())

app.use(require('./router/auth'))


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("successfully connected to mongodb")
})

mongoose.connection.on('error',(err)=>{
    console.log("successfully connected to mongodb",err)
})

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})