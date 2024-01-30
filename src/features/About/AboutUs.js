import team2 from '../../assets/images/about/team2.jpg'
import team3 from '../../assets/images/about/team3.jpg'
import team4 from '../../assets/images/about/team4.jpg'
import team5 from '../../assets/images/about/team5.jpg'
import team6 from '../../assets/images/about/team6.jpg'

const people = [
    {
        name: 'Leslie Alexander',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        imageUrl: team2,
    },
    {
        name: 'Dries Vincent',
        role: 'Business Relations',
        imageUrl: team3,
    },
    {
        name: 'Lindsay Walton',
        role: 'Front end Developer',
        imageUrl: team4,
    },
    {
        name: 'Courtney Henry',
        role: 'Designer',
        imageUrl: team5,
    },
    {
        name: 'Tom Cook',
        role: 'Director of Product',
        imageUrl: team6,
    },
]

export default function AboutUs() {
    return (
        <div className="bg-white py-24 sm:py-12">
            <div className='mx-auto grid max-w-7xl gap-x-8 px-6 lg:px-8'>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Deliver what you want every time
                </h2>
                <p className="mt-6 text-md text-gray-500 text-justify">
                    Welcome to Dairy Delight, where we are committed to delivering the finest dairy products tailored to your preferences. With a passion for quality and a dedication to customer satisfaction, our app ensures a seamless experience every time you indulge in our dairy delights.
                </p>
                <p className="mt-6 text-md text-gray-500 text-justify">
                    At Dairy Delight, we understand that your taste buds deserve the best, and that's precisely what we promise to deliver. Our commitment to excellence is reflected in every aspect of our app, from the carefully curated selection of premium dairy products to the user-friendly interface designed with you in mind.
                </p>
                <p className="mt-6 text-md text-gray-500 text-justify">
                    **Why Choose Dairy Delight?**
                </p>
                <ul className="mt-3 list-disc list-inside text-md text-gray-500 text-justify">
                    <li>**Unmatched Quality:** Experience the epitome of dairy excellence with our handpicked selection of the finest products. We prioritize quality above all else to bring you a taste that transcends expectations.</li>
                    <li>**Tailored to You:** No two preferences are the same, and neither should your dairy choices be. Personalize your experience and receive exactly what you desire, every single time.</li>
                    <li>**Reliability You Can Trust:** Our commitment to consistency ensures that you can rely on us for a delightful experience, whether it's your daily dairy fix or a special treat.</li>
                    <li>**Innovative Statistics:** Explore the fascinating world of dairy with our insightful statistics. From nutritional information to the journey of our products, stay informed and make choices that align with your lifestyle.</li>
                </ul>
                <p className="mt-6 text-md text-gray-500 text-justify">
                    **Delve into the World of Dairy with Dairy Delight.** Indulge in a symphony of flavors, discover the story behind each product, and elevate your culinary experience with the assurance that Dairy Delight is here to deliver what you want, every time.
                </p>
            </div>
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3 mt-10 pt-10">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 text-justify">
                        We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients..
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
