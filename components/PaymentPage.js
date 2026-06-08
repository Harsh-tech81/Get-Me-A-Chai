"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();

  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast("Thanks for your donation!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.replace(`/${username}`);
    }
  }, [searchParams, router, username]);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u);
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };

  const pay = async (amount) => {
    if (!currentUser?.razorpayid) {
      toast.error("Razorpay key is missing for this creator.");
      return;
    }

    // Get the order Id
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me A Chai", //your business name
      description: "Test Transaction",
      image: "/logo5.jpg",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URI}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Harsh Kumar", //your customer's name
        email: "harshkr.221104@gmail.com",
        contact: "+91-8986371311", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full relative">
        <img
          className="w-full h-[200px] sm:h-[250px] md:h-[350px] object-cover"
          src={currentUser.coverpic || "/Home1.avif"}
          alt="cover"
        />
        <div className="absolute -bottom-16 md:-bottom-[72px] left-1/2 -translate-x-1/2 border-white border-2 rounded-full overflow-hidden bg-slate-950">
          <img
            className="rounded-full object-cover w-32 h-32 md:w-36 md:h-36"
            src={currentUser.profilepic || "/logo5.jpg"}
            alt="profile"
          />
        </div>
      </div>
      <div className="info flex justify-center items-center mt-20 md:mt-24 mb-16 md:mb-24 flex-col gap-2 px-4 text-center">
        <div className="font-bold text-xl md:text-2xl mt-4">@{username}</div>
        <div className="text-slate-400 text-sm md:text-base">Let's help {username} get a chai!</div>
        <div className="text-slate-400 text-xs md:text-sm">
          {payments.length} Payments . ₹
          {payments.reduce((a, b) => a + b.amount, 0)} raised
        </div>

        <div className="payment flex gap-6 w-full max-w-6xl px-4 md:px-0 md:w-[90%] lg:w-[80%] mt-11 flex-col md:flex-row text-left">
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-6 md:p-10 border border-white/5">
            {/* Show list of all the supporters as a leaderboard  */}
            <h2 className="text-xl md:text-2xl font-bold my-5">Top 10 Supporters</h2>
            <ul className="mx-2 md:mx-5 text-sm">
              {payments.length == 0 && <li>No payments yet</li>}
              {payments.map((p, i) => {
                return (
                  <li key={i} className="my-4 flex gap-3 items-center">
                    <img width={33} className="rounded-full" src="/avatar.gif" alt="user avatar" />
                    <span>
                      {p.name} donated{" "}
                      <span className="font-bold text-yellow-500">₹{p.amount}  </span> with a
                      message &quot;{p.message}&quot;
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-6 md:p-10 border border-white/5">
            <h2 className="text-xl md:text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-3 flex-col">
              {/* input for name and message   */}
              <div>
                <input
                  onChange={handleChange}
                  value={paymentform.name}
                  name="name"
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Enter Name"
                />
              </div>
              <input
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Enter Message"
              />

              <input
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Enter Amount"
              />

              <button
                onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                type="button"
                className="text-white cursor-pointer bg-linear-to-br from-purple-900 to-blue-900 hover:bg-linear-to-bl focus:ring-4 focus:outline-hidden focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center transition disabled:bg-slate-600 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={
                  paymentform.name?.length < 3 ||
                  paymentform.message?.length < 4 ||
                  paymentform.amount?.length < 1
                }
              >
                Pay
              </button>
            </div>
            {/* Or choose from these amounts  */}
            <div className="grid grid-cols-3 gap-2 mt-5">
              <button
                className="bg-slate-800 hover:bg-slate-700 transition cursor-pointer p-3 rounded-lg text-center text-sm font-semibold border border-slate-700"
                onClick={() => pay(1000)}
              >
                Pay ₹10
              </button>
              <button
                className="bg-slate-800 hover:bg-slate-700 transition cursor-pointer p-3 rounded-lg text-center text-sm font-semibold border border-slate-700"
                onClick={() => pay(2000)}
              >
                Pay ₹20
              </button>
              <button
                className="bg-slate-800 hover:bg-slate-700 transition cursor-pointer p-3 rounded-lg text-center text-sm font-semibold border border-slate-700"
                onClick={() => pay(3000)}
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
