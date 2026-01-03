"use client"
import React, { useEffect } from 'react'
import Script from 'next/script'
import { Initiate, fetchPayment, fetchuser } from '@/action/useraction'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation'
import connectdb from '@/Dbconnect/connectdb'
import payment from '@/modules/payment'
import User from '@/modules/User'
import { useRouter } from 'next/navigation'
const PaymentPage = ({ username }) => {

    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [paymentlist, setpaymentlist] = useState([])
    const [currUser, setcurrUser] = useState({})
    const searchparams = useSearchParams()
    const router = useRouter()
    const [total, settotal] = useState(0)
    useEffect(() => {
        getdata()
        getPaymentlist()
    }, [])
    useEffect(() => {
        if (searchparams.get("paymentdone") == "true") {
            toast('Thanks for Your Donatation', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
        router.push(`/${username}`)
    }, [])
    // useEffect(() => {
    //     console.log(paymentlist)
    // }, [paymentlist])

    const handlechange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }
    const session = useSession();


    const getdata = async () => {
        console.log("get function called!");
        let u = await fetchuser(username)
        setcurrUser(u)

    }
    const getPaymentlist = async () => {
        console.log('getpayment function is called')
        let dbpayments = await fetchPayment(username)
        console.log('hi')
        console.log(dbpayments)
        setpaymentlist(dbpayments)
    }

    const pay = async (amount) => {
        let a = await Initiate(amount, username, paymentform)
        let order_id = a.id;
        var options = {
            "key": currUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount * 100, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Get Me a Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order_id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }
    // Calculate total payment amount
    useEffect(() => {
        let total = paymentlist.reduce((acc, pay) => acc + pay.amount, 0);
        settotal(total);
    }, [paymentlist])

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div>
                <div className='w-full relative'>
                    <div>
                        <img className='object-cover relative z-0 w-full h-[350px]' src={currUser.coverpic} alt="coverpic" />
                    </div>
                    <div className='absolute -bottom-15 size-32  right-[45%] overflow-hidden'>
                        <img className='rounded-full border-2 border-white size-32 object-cover' src={currUser.profilepic} alt="profile pic" />
                    </div>
                </div>
                <div>
                    <div className="info flex flex-col justify-center items-center text-bold text-xl text-center my-20">
                        <p className=''>{username}</p>
                        <div className='text-slate-400 '>
                            Help <b className='text-slate-200'> {currUser.name}</b> to get his Chai
                        </div>
                        <div className='text-shadow-gray-500 '>
                            Total ₹{paymentlist.reduce((acc, pay) => acc + parseInt(pay.amount), 0)} raised. collected from {paymentlist.length} payment recieved.
                        </div>
                    </div>
                </div>
                <div className="payment container mx-auto flex justify-center gap-5 min-h-[30vh] pb-24">
                    <div className="h-[380px] overflow-auto supporter w-[40%] border-2 border-white">
                        <div className="gif flex  items-center mt-10">
                            <img width={70} height={50} src="/avatar.gif" alt="Avatar" />
                            <h2 className='text-3xl  text-center font-bold text-cyan-700' >Supporters</h2>
                        </div>

                        <ul className=' text-center flex flex-col gap-3 pb-5'>
                            {paymentlist.length === 0 && <li>No payments Yet</li>}
                            {paymentlist.map((item) => {
                                return <li key={item.oid} className='flex justify-start items-start my-2 px-5  text-lg font-semibold'>
                                    {item.name} has doneted ₹{item.amount} with the message `{item.message}`
                                </li>
                            })}

                        </ul>
                    </div>
                    <div className="make-payment w-[40%] border-2 border-white ">
                        <h2 className='mt-10 text-2xl text-center font-bold text-cyan-700' >Make Payment</h2>
                        <div className="inputs flex flex-col gap-3 mb-4">
                            <input onChange={(e) => handlechange(e)} value={paymentform.name} name='name' className='h-10 w-[70%] border-2 border-white px-2 rounded-lg mx-5' type="text" placeholder='Enter the Name' />
                            <input onChange={(e) => handlechange(e)} value={paymentform.message} name='message' className='h-10 w-[70%] border-2 border-white px-2 rounded-lg mx-5' type="text" placeholder='Enter the Message' />

                            <input onChange={(e) => handlechange(e)} value={paymentform.amount} name='amount' className='h-10 w-[70%] border-2 border-white px-2 rounded-lg mx-5' type="number" placeholder='Enter the Amount' />
                            <button onClick={() => { pay(Number.parseInt(paymentform.amount)) * 100 }} className='disabled:from-gray-400 disabled:via-gray-700 disabled:to-gray-600 mt-[6px] w-[70%] px-2 mx-5 cursor-pointer text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600  focus:ring-4 focus:outline-none focus:ring-teal-300  font-medium rounded-lg text-sm py-2.5 text-center me-2 mb-2' disabled={
                                !paymentform.name?.length>3 ||
                                !paymentform.message?.length>4||
                                !paymentform.amount ||
                                isNaN(Number(paymentform.amount)) ||
                                Number(paymentform.amount) <= 0
                            }
                            >Pay Now</button>

                        </div>
                        <div className="defaultpayment flex gap-3 mx-5 pb-6">
                            <button onClick={() => pay(10)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" justify-center cursor-pointer mx-2  bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center " type="button">Pay ₹10</button>
                            <button onClick={() => pay(20)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" justify-center cursor-pointer mx-2  bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center " type="button">Pay ₹20</button>

                            <button onClick={() => pay(50)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" justify-center cursor-pointer mx-2  bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center " type="button">Pay ₹50</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PaymentPage
