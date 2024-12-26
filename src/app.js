const express=require('express')

const app=express();

app.use("/",(req,res)=>{
    res.send('Welcome')
})

app.use("/home",(req,res)=>{
    res.send('Hello World')
})

app.use("/login",(req,res)=>{
    res.send('Login here')
})

app.listen(3000,()=>{
    console.log('server is running on port 3000')
});
