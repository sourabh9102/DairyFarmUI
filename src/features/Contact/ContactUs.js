import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function ContactUs() {
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log("data", data);
        axios.post("http://localhost:5001/auth/contact", data)
            .then(res => {
                if (res.data.success) {
                    alert("Thanks! We'll connect you soon.");
                    navigate('/');
                }
            })
            .catch(err => {
                console.log("Error:", err);
            });
    }

    return (
        <>
            <div class="container my-5 mx-auto md:px-6 ">
                <section class="mb-32">
                    <div class="flex justify-center">
                        <div class="text-center md:max-w-xl lg:max-w-3xl">
                            <h2 class="mb-12 px-6 text-3xl font-bold">Contact us</h2>
                        </div>
                    </div>

                    <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-full lg:px-6">
                        <div className="isolate bg-white px-6 lg:px-8">
                            <div
                                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                                aria-hidden="true"
                            >
                                <div
                                    className="relative -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                                    style={{
                                        clipPath:
                                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                    }}
                                />
                            </div>
                            <form action="#" method="POST" className="mx-auto max-w-xl" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            First name
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="text"
                                                name="fname"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Last name
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="text"
                                                name="lname"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Email
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Message
                                        </label>
                                        <div className="mt-2.5">
                                            <textarea
                                                name="message"
                                                id="message"
                                                rows={4}
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                                                defaultValue={''}
                                            />
                                        </div>
                                    </div>
                                    <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                                        <div className="flex h-6 items-center">
                                            <Switch
                                                checked={agreed}
                                                onChange={setAgreed}
                                                className={classNames(
                                                    agreed ? 'bg-indigo-600' : 'bg-gray-200',
                                                    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                )}
                                            >
                                                <span className="sr-only">Agree to policies</span>
                                                <span
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        agreed ? 'translate-x-3.5' : 'translate-x-0',
                                                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                                    )}
                                                />
                                            </Switch>
                                        </div>
                                        <Switch.Label className="text-sm leading-6 text-gray-600">
                                            By selecting this, you agree to our{' '}
                                            <a href="#" className="font-semibold text-indigo-600">
                                                privacy&nbsp;policy
                                            </a>
                                            .
                                        </Switch.Label>
                                    </Switch.Group>
                                </div>
                                <div className="mt-10">
                                    <button
                                        type="submit"
                                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        disabled={!agreed}
                                    >
                                        Let's talk
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ContactUs