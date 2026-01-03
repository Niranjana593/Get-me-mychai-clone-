import mongoose from "mongoose";
const { Schema, model,models } = mongoose;

const userSchema=new Schema({
    name:{type:String },
    email:{type:String ,required:true},
    userName:{type:String ,required:true},
    profilepic:{type:String },
    coverpic:{type:String},
    razorpayid:{type:String},
    razorpaysceret:{type:String},
    createdAt:{type:Date,default:Date.now},
    UpdatedAt:{type:Date,default:Date.now},
})

export default models?.User || model("User", userSchema);
