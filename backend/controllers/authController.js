import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const  signupUser = async (req, res) => {
    try{
const { name, email, password } = req.body;

// Check if user already exists
const UserExists = await User.findOne({ email });
if (UserExists) {
    return res.status(400).json({ message: "User already exists" });
}

// Hash the password
const hashPassword = await bcrypt.hash(password, 10);


// Create new user
await User.create({
    name,
    email,
    password: hashPassword
});

res.json({ message: "User created successfully" });
    }catch(error){
        res.status(500).json({ message: "Server error", error});
    }   
}; 