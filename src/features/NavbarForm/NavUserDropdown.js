import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa'
import { BsBoxSeam } from 'react-icons/bs';
import { ImProfile } from 'react-icons/im';
import { BiLogIn } from 'react-icons/bi';
import './NavUserDropdown.css';

const solutions = [
    { name: 'My Profile', href: '/login', icon: ImProfile },
    { name: 'Orders', href: '/orders', icon: BsBoxSeam },
    { name: 'Wishlist', href: '/wishlist', icon: AiOutlineHeart },
];

const callsToAction = [
    { name: 'Sign In', href: '/login', icon: BiLogIn },
    { name: 'Register', href: '/registration', icon: FaUserCircle },
];

function NavUserDropdown() {
    return (
        <Popover className="relative applyZindex">
            <Popover.Button className="inline-flex items-center text-2xl font-semibold leading-6 text-gray-900">

            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute mt-5 flex -translate-x-1/2 px-4">
                    <div className="w-52 flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-2">
                            {solutions.map((item) => (
                                <div key={item.name} className="group relative flex gap-x-6 rounded-md p-4 hover:bg-gray-50">
                                    <div className="mt-1 flex h-5 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <Link to={item.href} className="font-semibold text-gray-900">
                                            {item.name}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                            {callsToAction.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                                >
                                    <item.icon className="h-6 w-6 flex-none text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

export default NavUserDropdown;
