import { UsersIcon } from '@heroicons/react/outline'

const stats = [
    { id: 1, name: 'Varieties of Dairy Products', value: '100+' },
    { id: 2, name: 'Average Customer Rating', value: '4.8/5' },
    { id: 3, name: 'Dairy Farms Partnered', value: '300+' },
    { id: 6, name: 'Years in Business', value: '10+' },
    { id: 5, name: 'Delivery', value: '24/7' },
    { id: 4, name: 'Daily Milk Production', value: '1 mn+ liters' },
];

function Stats() {
    return (
        <>
            <hr />
            <div className="relative bg-white">
                <div className="mt-16 sm:h-40 lg:absolute lg:left-0 lg:w-1/2 max-w-2xl mx-auto lg:mr-0 lg:ml-auto lg:w-1/2 lg:pl-10">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Deliver what you want every time
                    </h2>
                    <p className="mt-6 text-md text-gray-500 text-justify">
                        Here we are committed to delivering the finest dairy products tailored to your preferences. With a passion for quality and a dedication to customer satisfaction, our app ensures a seamless experience every time you indulge in our dairy delights.
                    </p>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:py-16">
                    <div className="max-w-2xl mx-auto lg:max-w-none lg:mr-0 lg:ml-auto lg:w-1/2 lg:pl-10">
                        <div className="mt-8 flex flex-wrap -mx-4">
                            {stats.map((stat) => (
                                <div key={stat.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-8">
                                    <dd className="text-2xl font-extrabold text-indigo-600 sm:text-3xl">{stat.value}</dd>
                                    <dt className="text-base font-medium text-gray-500">{stat.name}</dt>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-5">
                        {stats.map((stat) => (
                            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div> */}
        </>
    );
}

export default Stats;
