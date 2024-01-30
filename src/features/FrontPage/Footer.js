import { Typography } from "@material-tailwind/react";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube, BsPinterest } from 'react-icons/bs'
import Newsletter from "./Newsletter";
import appstoreBtn from '../../assets/images/appstore-btn.svg'
import googleplayBtn from '../../assets/images/googleplay-btn.svg'
import amazonpay from '../../assets/images/amazonpay.svg'
import mastercard from '../../assets/images/mastercard.svg'
import paypal from '../../assets/images/paypal.svg'
import visa from '../../assets/images/visa.svg'
import { Link } from "react-router-dom";

const LINKS = [
    {
        title: "Get to know us",
        items: [
            { name: "Privacy Policy", route: '/policy' },
            { name: "Blog", route: '/blog' },
            { name: "Help center", route: '/help' },
            { name: "Our value", route: '/values' },
        ],
    },
    {
        title: "For Consumers",
        items: [
            { name: "FAQs", route: '/faq' },
            { name: "Return/Exchange", route: '/exchange' },
            { name: "Gift Cards", route: '/gifts' },
            { name: "Events", route: '/events' },
        ],
    },
    {
        title: "Become a Shopper",
        items: [
            { name: "Ideas & Guides", route: '/guides' },
            { name: "New Retailers", route: '/retailers' },
            { name: "Events", route: '/events' },
            { name: "Help center", route: '/help' },
        ],
    },
];

const currentYear = new Date().getFullYear();

function Footer() {
    return (
        <footer className="relative w-full mt-10 mb-10">
            <div className="mx-auto w-full max-w-7xl px-8">
                <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
                    <Typography variant="h5" className="mb-6">
                        <Newsletter />
                    </Typography>
                    <div className="grid grid-cols-3 justify-between gap-4 mt-10">
                        {LINKS.map(({ title, items }) => (
                            <ul key={title}>
                                <Typography
                                    variant="medium"
                                    color="black"
                                    className="mb-3 font-medium text-xl"
                                >
                                    {title}
                                </Typography>
                                {items.map(({ name, route }) => (
                                    <li key={name}>
                                        <Typography
                                            as={Link}
                                            to={route}
                                            href="#"
                                            color="gray"
                                            className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                                        >
                                            {name}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="mt-10">
                    <div className="border-t py-4">
                        <div className="flex flex-col lg:flex-row items-center lg:justify-between">
                            <div className="text-center lg:text-start">
                                <ul className="flex gap-5 list-inline translate-y-3 sm:mb-5">
                                    <li className="list-inline-item text-dark">Payment Partners</li>
                                    <li className="list-inline-item">
                                        <a href="#!"><img src={amazonpay} alt="" /></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#!"><img src={mastercard} alt="" /></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#!"><img src={paypal} alt="" /></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#!"><img src={visa} alt="" /></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="">
                                <ul className="flex gap-3 list-inline mb-0 text-center lg:mt-0 md:mt-5 lg:text-lg-end">
                                    <li className="lg:mb-0 text-dark translate-y-3">Get deliveries with Dairy Delight</li>
                                    <li className="list-inline-item ms-4">
                                        <a href="#!"><img src={appstoreBtn} alt="" style={{ width: '140px' }} /></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#!"><img src={googleplayBtn} alt="" style={{ width: '140px' }} /></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-10 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
                    <Typography
                        variant="small"
                        className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
                    >
                        &copy; {currentYear} <a href="/">Dairy Delight</a>. All
                        Rights Reserved.
                    </Typography>
                    <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100 text-xl">
                            <BsFacebook />
                        </Typography>
                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100 text-xl">
                            <BsInstagram />
                        </Typography>
                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100 text-xl">
                            <BsTwitter />
                        </Typography>
                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100 text-xl">
                            <BsYoutube />
                        </Typography>
                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100 text-xl">
                            <BsPinterest />
                        </Typography>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;