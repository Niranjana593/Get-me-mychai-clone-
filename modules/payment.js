import mongoose from "mongoose";
import Razorpay from "razorpay";
const { Schema, model,models } = mongoose;

const userSchema=new Schema({
    name:{type:String ,required:true},
    to_user:{type:String ,required:true},
    oid:{type:String ,required:true},
    message:{type:String },
    amount:{type:Number ,required:true},
    done:{type:Boolean,default:false},
    razorpayid:{type:String},
    razorpaysecret:{type:String},
    createdAt:{type:Date,default:Date.now},
    UpdatedAt:{type:Date,default:Date.now},
})

export default models?.Payment || model("Payment", userSchema);
