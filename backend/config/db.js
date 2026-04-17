import mongoose from "mongoose";

const connectDB = async() =>{
    try{
await mongoose.connect(process.env.MONGO_URI);
console.log("mongo DB URI CONNECTED SUCCESSFULLY");

    }
    catch(error){
        console.error( `Error: ${error.message}`);
        
    }
}           

export default connectDB;