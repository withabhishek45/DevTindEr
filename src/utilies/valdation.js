const validator = require("validator");

const validateSingupData = (req) => {
    const { name, password, gender, email, phone } = req.body;
    if (!name) {
        return { error: "Name is required" };
    } else if (!validator.isEmail(email)) {
        return { error: "Invalid Email" };
    }
    else if (!validator.isStrongPassword(password)) {
        return { error: "Password must be strong" };
    }
    else if (!validator.isLength(phone, { min: 10, max: 10 })) {
        return { error: "Phone number must be 10 digit" };
    }
    else if (!validator.isIn(gender, ['male', 'female', 'other'])) {
        return { error: "Invalid gender" };
    }


};
module.exports = {
    validateSingupData
};