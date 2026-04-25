import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// signup user
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

// login user
export const loginUser = async (req, res) => {
    try{
const { email, password } = req.body;

// Check if user exists
const user = await User.findOne({ email });
if (!user) {
    return res.status(400).json({ message: "User does not exist" });
}

// Check if password is correct
const match = await bcrypt.compare(password, user.password);
if (!match) {
    return res.status(400).json({ message: "Invalid credentials" });
}

// Generate JWT token
const token = jwt.sign({ id: user._id },
     process.env.JWT_SECRET, 
     { expiresIn: "1d" });

res.json({ message: "Login successful", token });
    }
    catch(error){
        res.status(500).json({ message: "Server error", error});
    }
}

