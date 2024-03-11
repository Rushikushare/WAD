const express =require('express');
const app=express();
const mongoose =require('mongoose');
const router = require('./Controller/controller');

const url='mongodb://127.0.0.1:27017/rk';
  mongoose.connect(url);

  app.use('/',router)
app.listen(90,()=>{
   
    console.log("Connected");
});

