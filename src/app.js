const express=require('express')

const app=express();

const {adminAuth, numberCheck}=require("./MIDDLEWARE/auth")

app.use("/admin", adminAuth);

app.use("/user",numberCheck ,(req, res, next) => {
    const number = 5;
    const correct = number  === 5;
 
    if (correct) {
       res.send('Number  is correct');
    } else {
       res.status(401).send("Number is incorrect");
    }
 });
 
//

// app.get("/user",(req,res)=>{
//     res.send({fname:"Abhishek",lname:"Kumar"})
// })
// app.post("/user",(req,res)=>{
//     res.send("Succesfully saved to Database....")
// })
// app.delete("/user",(req,res)=>{
//     res.send("Data deleted sucessfully.....")
// })
// app.use("/home",(req,res)=>{
//     res.send('Hello World')
// })

// app.use("/login",(req,res)=>{
//     res.send('Login here')
// })

// app.use("/",(req,res)=>{
//     res.send('Welcome')
// })
app.listen(3000,()=>{
    console.log('server is running on port 3000')
});
