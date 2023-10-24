import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MyHeader from "./Header";
import MyFooter from "./Footer";

export default function OtpVerification() {
    const [enterdotp, setEnterdotp] = useState('');
    const [redirect, setRedirect] = useState(false);

    const location = useLocation();
    const enteredemail = location.state ? location.state.enteredemail : null;

    const VerifyOtp = async (e) => {
        e.preventDefault();
        if (!enteredemail) {
            toast('👽:Dude, I am alien not you, so go to the login page and continue the process genuinely', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        try {
            const response1 = await axios.post(`${process.env.REACT_APP_URI_VER}`, {
                enteredemail,
                enterdotp
            });
            if (response1.status === 201) {
                console.log(response1.data);
                toast.success("Account verified successfully", {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setRedirect(true);
            } else if (response1.status === 200) {
                toast.error('Wrong Otp', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                console.log(response1.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <MyHeader></MyHeader>
            <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                {enteredemail ? (
                                    <p>We have sent a code to your email </p>
                                ) : (
                                    <p>Looks like someone is trying to be a smart***</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <form action="" method="post">
                                <div className="flex flex-col space-y-16">
                                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                        <div className="w-full h-16 ">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" onChange={(e) => setEnterdotp(e.target.value)} type="text" name="enterdotp" id="enterdotp" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-5">
                                        <div>
                                            <button onClick={VerifyOtp} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                                Verify Account
                                            </button>
                                            <ToastContainer />
                                        </div>

                                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p>Didn't receive code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <MyFooter></MyFooter>
        </div>
    )
}
