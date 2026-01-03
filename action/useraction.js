"use server";

import Razorpay from "razorpay";
import payment from "@/modules/payment";
import connectdb from "@/Dbconnect/connectdb";
import User from "@/modules/User";
export const Initiate = async (amount, to_user, paymentform) => {
  await connectdb();

  const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  const options = {
    amount: Number.parseInt(amount)*100, // convert to paise
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  await payment.create({
    oid: order.id,
    amount: amount,
    to_user: to_user,
    name: paymentform.name,
    message: paymentform.message,
  });

  return order; // send back order to frontend
};

// export const fetchuser = async (username) => {
//     await connectdb()
//     let u = await User.findOne({ userName: username })
//     let user = u.toObject({ flattenObjectIds: true })
//     return user
// }
export const fetchuser = async (username) => {
  await connectdb()
  let finduser = await User.findOne({ userName:username })
  console.log(finduser)
  if (!finduser) return null;
  return finduser.toObject({ flattenObjectIds: true });

}

export const fetchPayment = async (username) => {
  await connectdb()
  return await payment.find({ to_user: username, done:true }).sort({ amount:-1 }).limit(5).lean()
}

export const updateprofile=async(data,oldUsername)=>{
  await connectdb()
  let form=Object.fromEntries(data)
  console.log(form)
  if(oldUsername!=form.userName)
  {
    let u=User.findOne({userName:form.userName})
    if(!u)
    {
        return {error:"User already Exists"}
    }
    await User.updateMany({email:form.email},form)
  }
  else{
    await User.updateMany({email:form.email},{$set:form})
  }
}