import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ForgotPass() {

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/auth/forgotPass', { password1: password1, password2: password2 })
            .then(res => {
                if (res.data.success) {
                    alert("Password changed successfully.")
                    navigate('/login');
                }
            })
            .catch((err) => {
                console.log(err, "Password did not changed.");
            })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="rounded overflow-hidden shadow-lg w-80 pt-10 pb-10 mx-auto">
                <form onSubmit={handleSubmit}>
                    <label className=" flex-col block text-gray-700 text-sm font-bold mb-2 pt-5">New Password</label>
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Enter New Password"
                        name='password1'
                        onChange={(e) => setPassword1(e.target.value)} />
                    <label className="block text-gray-700 text-sm font-bold mb-2 pt-5">Retype Password</label>
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                        type="password"
                        placeholder="Retype Password"
                        name='password2'
                        onChange={(e) => setPassword2(e.target.value)}
                    /> <br />
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-sm rounded-md px-4 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPass