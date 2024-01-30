import { Input } from '@material-tailwind/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Newsletter() {

    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubscribe = () => {
        setLoading(true);
        axios.post("http://localhost:5001/auth/subscribe", { subscribeEmail: email })
            .then(res => {
                if (res.data.success) {
                    alert("Thanks for subscribe! We'll keep in touch with you.");
                    navigate('/');
                }
            })
            .catch(err => {
                console.log("Error:", err);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <>
            <div className="mt-10 max-w-xl lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-Black sm:text-2xl">Subscribe to our newsletter</h2>
                <p className="mt-4 text-base leading-8 text-gray-500">
                    Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt
                    dolore.
                </p>
                <div className="mt-6 flex max-w-md gap-x-4">
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <Input
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <button
                        type="submit"
                        className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        onClick={handleSubscribe}
                        disabled={loading}
                    >
                        {loading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Newsletter;