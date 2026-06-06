"use server";

import Razorpay from "razorpay";
import User from "@/models/User.js";
import Payment from "@/models/Payment.js";
import connectDB from "@/db/connectDb.js";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;

  var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);

  // create a payment object which shows a pending payment in the database
  await Payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message
  });

  return x;
};
