import React, { useState } from 'react';
// import './FrontPageForm.css';
import { Carousel, Typography, Button } from "@material-tailwind/react";
import slideshow1 from '../../assets/images/slideshow1.png'
import slideshow2 from '../../assets/images/slideshow2.png'
import slideshow3 from '../../assets/images/slideshow3.png'
import { IoArrowRedoCircle } from 'react-icons/io5'
import naturalMilk from '../../assets/images/naturalMilk.jpg'
import grazingNaturally from '../../assets/images/icons/grazingNaturally.png'
import caringCow from '../../assets/images/icons/caringCow.png'
import chillingFaster from '../../assets/images/icons/chillingFaster.png'
import heroSection from '../../assets/images/heroSection.png'


const features = [
    {
        name: 'GRAZING NATURALLY',
        description:
            'Our cows are grazed naturally. We feed our cows with naturally grown grass and chemical-free cattle feed along with oil cakes and natural mineral supplements.',
        icon: grazingNaturally,
    },
    {
        name: 'CARING WITH LOVE',
        description: 'Cows in our farms are treated with love and care. We monitor closely to make sure they are properly housed, washed, and health is periodically checked.',
        icon: caringCow,
    },
    {
        name: 'CHILLING FASTER',
        description: 'After milking, milk is chilled as quickly as possible to 4°C. This helps to avoid bacterial growth and maintain freshness.',
        icon: chillingFaster,
    },
]

function FrontPageForm() {



    return (
        <>
            <Carousel loop={true} autoplay={true} autoplayDelay={5000} className="rounded-xl bg-blue-700">
                <div className="relative">
                    <div className="absolute left-0 top-0 h-full flex items-center">
                        <div className="text-white p-4">
                            <p className="text-4xl">DELICIOUS</p>
                            <p className="text-2xl">Save Up to 30% Off</p>
                            <p>
                                Excepteur sint occaecat cupidatat non proident, <br />
                                sunt in culpa qui officia
                            </p>
                            <Button color="green" variant="gradient" className="rounded-full flex p-2 items-center">
                                <IoArrowRedoCircle className="text-3xl" />
                                <span className="text-sm">Shop Now</span>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <img src={slideshow1} alt="first slide" className="w-full object-cover" />
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-0 h-full flex items-center">
                        <div className="text-white p-4">
                            <p className="text-4xl">TRUE YOUGURT</p>
                            <p className="text-2xl">Save Up to 30% Off</p>
                            <p>
                                Bibdum auctor, nisi elit consequat ipsum, nec sagittis sem nibh <br /> id elit
                            </p>
                            <Button color="green" variant="gradient" className="rounded-full flex p-2 items-center">
                                <IoArrowRedoCircle className="text-3xl" />
                                <span className="text-sm">Shop Now</span>
                            </Button>
                        </div>
                    </div>
                    <div className="">
                        <img src={slideshow2} alt="second slide" className="w-full object-cover" />
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-0 h-full flex items-center">
                        <div className="text-white p-4">
                            <p className="text-4xl">TRUE YOGURT</p>
                            <p className="text-2xl">Get Up 50%</p>
                            <p>
                                Duis sed odio sit amet nibh vulputate cursus a sit amet mauris
                            </p>
                            <Button color="green" variant="gradient" className="rounded-full flex p-2 items-center">
                                <IoArrowRedoCircle className="text-3xl" />
                                <span className="text-sm">Shop Now</span>
                            </Button>
                        </div>
                    </div>
                    <div className="">
                        <img src={slideshow3} alt="third slide" className="w-full object-cover" />
                    </div>
                </div>
            </Carousel>

            <div id='process'>
                <div className="overflow-hidden bg-white py-5 sm:pt-28">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className='flex'>
                            <h2 className="font-semibold text-indigo-600 mb-2 translate-y-2">More than</h2>
                            <p className="text-3xl font-bold text-gray-900 sm:text-4xl ml-3 underline">Natural</p>
                        </div>
                        <div className="mt-5 mx-auto grid max-w-2xl grid-cols-1 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            <div className="lg:pr-8 lg:pt-4">
                                <div className="lg:max-w-lg">
                                    <dl className="max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none text-justify">
                                        {features.map((feature) => (
                                            <div key={feature.name} className="relative pl-9">
                                                <dt className="inline font-semibold text-gray-900">
                                                    <img src={feature.icon} alt={feature.name} className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                                    {feature.name}
                                                </dt>{' '}<br />
                                                <dd className="inline">{feature.description}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                            <img
                                src={naturalMilk}
                                alt="Natural Milk"
                                className="mt-3 w-[2rem] max-w-full rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FrontPageForm;
