// const express=require("express")

// const app=express()

const adminAuth=(req, res, next) => {
    const age = 5;
    const correct = age === 25;
 
    if (correct) {
       res.send('Age is correct');
    } else {
       res.status(401).send("Age is incorrect");
    }
 };
const numberCheck= (req, res, next) => {
    const age = 5;
    
 
    if (age=> 18) {
       res.send('You are Adult');
    } else {
       res.status(401).send("You are Minor");
    }
 };
module.exports={
    
    numberCheck

}
//  app.listen(3000,()=>{
//     console.log('server is running on port 3000')
// });
