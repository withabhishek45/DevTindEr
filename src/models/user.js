const { compare } = require("bcrypt");
const mongoose = require("mongoose");
var validator = require('validator');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true,unique:true },
    email: {
      type: String,
      required: [true,"Email is required"],
      unique:true,
      lowercase: true,
      trim: true,
      validator(value){
        if(!validator.isEmail(value)){
            throw new Error('Invalid email')
            }   
      }
    },
    password: { type: String, required: true ,
     
    },
    phone: { type: String },
    address: { type: String },
    role: { type: String, required: true },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"], // Predefined valid values
      validate: {
        validator: function (value) {
          return ["male", "female", "other"].includes(value.toLowerCase());
        },
        message: (props) =>
          `${props.value} is not a valid gender. Please select 'male', 'female', or 'other'.`,
      },
    },
  },
  {
    timestamps: true, // This ensures createdAt and updatedAt fields are automatically added
  }
);

// UserSchema Methods for jwt token
userSchema.methods.getJWT =async function() {
  const user = this;
  const token =await jwt.sign({ _id: user._id }, "Abjisjk@#123",{
    expiresIn: "1h",

  } );
      return token;
      };

    // UserSchema Methods for  validatepassword 
    userSchema.methods.validatePassword = async function(passwordInputByUser) {
      const user = this;
      const hashedPassword = user.password;
      const isPasswordValid=await bcrypt.compare(passwordInputByUser, user.password);
      return isPasswordValid;
      };

      

// const User = mongoose.model("User", userSchema);

// Avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
