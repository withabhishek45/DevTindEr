const mongoose= require("mongoose");

const connectDB= async()=>{
    await mongoose.connect(
        "mongodb+srv://abhishekkumar28102005:XZoG1Hpluk2rU4jK@cluster0.y5oxs.mongodb.net/devTinder"
    );
};

module.exports=connectDB;


