const express=require('express');
const app=express();
const port=800;


// app.use(express.static('public'));

app.get('/',(res,req)=>{
    req.sendFile(__dirname+'/public/index.html')
})

app.get('/About',(res,req)=>{
    req.sendFile(__dirname+'/public/About.html')
})

app.get('/Services',(res,req)=>{
    req.sendFile(__dirname+'/public/Services.html')
})


app.listen(port);