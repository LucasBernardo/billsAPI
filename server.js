require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_STRING, {useNewUrlParser: true, useUnifiedTopology:true})
const db = mongoose.connection

db.on('error',(err)=> console.log(err))
db.once('open', ()=> console.log('Database connected'))

app.use(express.json())

const billsRouter = require('./routes/bills') 
app.use('/bills', billsRouter)

app.listen(3000, ()=> console.log("Server Running at port 3000"))