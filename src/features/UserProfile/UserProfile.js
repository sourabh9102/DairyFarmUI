import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import {
    ClockIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon, } from '@heroicons/react/24/solid';
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { clearCart } from '../Cart/cartProductSlice';
import { selectUserDetails, setLogout } from '../Counter/userDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import defaultImage from '../../images/default.png';


function UserProfile() {
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const userDetail = useSelector(selectUserDetails);

    // const clientId = '992772560544-93mcb3ublmql2p0b9navenei9s40fqvq.apps.googleusercontent.com';

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:5001')
            .then(res => {
                if (res.data.valid) {
                    setName(res.data.fname);
                } else {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err))
    }, []);

    const cards = [
        { name: 'Account balance', href: '#', icon: MdOutlineAccountBalanceWallet, amount: '$30,659.45' },
    ]
    const transactions = [
        {
            id: 1,
            name: 'Payment to Molly Sanders',
            href: '#',
            amount: '$20,000',
            currency: 'USD',
            status: 'success',
            date: 'July 11, 2020',
            datetime: '2020-07-11',
        },
    ]
    const statusStyles = {
        success: 'bg-green-100 text-green-800',
        processing: 'bg-yellow-100 text-yellow-800',
        failed: 'bg-gray-100 text-gray-800',
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <div className=" min-h-0">
                <SideBarNav />
                <div className="lg:pl-64 flex flex-col flex-1">
                    <main className="flex-1 pb-8">
                        {/* Page header */}
                        <div className="bg-white shadow">
                            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                                    <div className="flex-1 min-w-0">
                                        {/* Profile */}
                                        <div className="flex items-center">
                                            <img
                                                className="hidden h-8 w-16 rounded-full sm:block"
                                                src={defaultImage}
                                                alt=""
                                            />
                                            <div>
                                                <div className="flex items-center">
                                                    <img
                                                        className="h-8 w-16 rounded-full sm:hidden"
                                                        src={defaultImage}
                                                        alt=""
                                                    />
                                                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                                                        Hello, {name}
                                                    </h1>
                                                </div>
                                                <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                                    <dt className="sr-only">Company</dt>
                                                    <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                                                        <FaRegAddressCard
                                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                        {userDetail.address}
                                                    </dd>
                                                    <dt className="sr-only">Account status</dt>
                                                    <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                                                        <CheckCircleIcon
                                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                                            aria-hidden="true"
                                                        />
                                                        Verified account
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default UserProfile

export function SideBarNav() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigation = [
        { name: 'Home', href: '/userprofile', icon: HomeIcon, current: true },
        { name: 'Order History', href: '/orderHistory', icon: ClockIcon, current: false },
        { name: 'Order Summary', href: '/orderSummary', icon: FiShoppingBag, current: false },
        { name: 'Settings', href: '/editprofile', icon: CiSettings, current: false },
    ]

    const secondaryNavigation = [
        { id: 1, name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
        { id: 2, name: 'Privacy', href: '#', icon: ShieldCheckIcon },
        { id: 3, name: 'Logout', icon: MdLogout }
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const handleLogout = () => {
        localStorage.clear();
        axios.post("http://localhost:5001/auth/logout")
            .then(res => {
                if (res.data.success) {
                    alert("Logout Successfully.");
                    dispatch(clearCart());
                    dispatch(setLogout());
                    navigate('/');
                } else {
                    alert("Error");
                }
            })
            .catch(err => console.log(err));
    }

    function handleNavigation(id) {
        switch (id) {
            case 3: handleLogout();
                break;
        }
    }
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <HiOutlineDocumentReport className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-shrink-0 flex items-center px-4">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                                    alt="Easywire logo"
                                />
                            </div>
                            <nav
                                className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
                                aria-label="Sidebar"
                            >
                                <div className="px-2 space-y-1">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                            onClick={() => alert("hi")}

                                        >
                                            <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6">
                                    <div className="px-2 space-y-1"                                    >
                                        {secondaryNavigation.map((item) => (
                                            <button
                                                key={item.name}

                                                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                                // onClick={() => handleNavigation(item.id)}
                                                onClick={() => alert("hi")}
                                            >
                                                <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 pt-20 mt-1">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
                    <nav className="flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                        <div className="px-2 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                        'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-6 pt-6">
                            <div className="px-2 space-y-1">
                                {secondaryNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="cursor-pointer group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                        onClick={() => handleNavigation(item.id)}
                                    >
                                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}