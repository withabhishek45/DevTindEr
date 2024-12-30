const mongoose = require("mongoose");
var validator = require('validator');

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
        validate: {
            validator: function (value) {
              // Strong password regex: Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
              const strongPasswordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
              return strongPasswordRegex.test(value);
            },
            message:
              "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
          }

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




const User = mongoose.model("User", userSchema);
module.exports = User;
