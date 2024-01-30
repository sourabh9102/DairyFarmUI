import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function EmailConfirm() {

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const verifyEmail = (e) => {
        e.preventDefault();
        console.log("Entered email is", email);
        axios.post('http://localhost:5001/auth/verifyEmail', { email: email })
            .then(res => {
                console.log("res wala email", res);
                console.log(res.data, "success if block");
                if (res.data.success) {
                    localStorage.setItem("token", res.data.token);
                    console.log("Token local me save ho gya");

                    // console.log("");
                } else {
                    console.log('Error: Email verification failed.');
                }
            })
            .catch((err) => {
                console.log("Error", err);
            })
    }

    const verifyOtp = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/auth/verify', { otp: otp, })
            .then((res) => {
                if (res.data.success) {
                    console.log("User verified.");
                    navigate('/forgotPass');
                } else {
                    console.log("User not verified.");
                }
            })
            .catch(err => {
                console.log("Error", err);
            })
    }

    return (
        <>
            <div>
                <input
                    className="shadow appearance-none border rounded ml-11 py-2 px-3 mt-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="otpRec"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)} />
                <button
                    type='submit'
                    className="bg-white hover:bg-gray-100 ml-11 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={verifyEmail}
                >
                    Send OTP
                </button>
            </div>
            <div>
                <input
                    className="shadow appearance-none border rounded ml-11 py-2 px-3 mt-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="otpRec"
                    placeholder="Enter received otp"
                    onChange={(e) => setOtp(e.target.value)} />
                <button
                    type='submit'
                    className="bg-white hover:bg-gray-100 ml-11 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={verifyOtp}
                >
                    Verify OTP
                </button>
            </div>

        </>
    )
}

export default EmailConfirm