import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FaPlus } from "react-icons/fa6";
import './MilkProduct.css'
import Pagination from '@mui/material/Pagination';
import * as React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchAllProductsAsync,
    selectAllProducts,
    selectFilteredProducts,
    selectFilteredProductsByType,
    selectSortedProducts,
    setFilteredProductsByType,
    setSortedProducts
} from './productSlice'
import axios from 'axios';
import { setAddToCart } from '../Cart/cartProductSlice';





const sortOptions = [
    { name: 'Best Rating', sortBy: 'rating', current: false },
    { name: 'Price: Low to High', sortBy: 'priceAsc', current: false },
    { name: 'Price: High to Low', sortBy: 'priceDesc', current: false },
]

const filters = [
    {
        id: 'pooja-needs-products',
        name: 'Pooja Needs & Gardening Products',
        options: [
            { value: 'gomutra', label: 'Gomutra', checked: false },
            { value: 'Cow Dung Cakes', label: 'Cow Dung Cakes', checked: false },
            { value: 'dhupbatti', label: 'Dhupbatti', checked: false },
            { value: 'Vermi Compost', label: 'Vermi Compost', checked: false },
            { value: 'Cow Dung Compost', label: 'Cow Dung Compost', checked: false },
            { value: 'jeevamrutam', label: 'Jeevamrutam', checked: false },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function OtherProducts() {

    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const filteredProducts = useSelector(selectFilteredProducts);
    const filteredProductsByType = useSelector(selectFilteredProductsByType);
    const sortedProducts = useSelector(selectSortedProducts);

    const productsKeys = Object.values(products);

    const renderProducts = filteredProducts.length > 0 ? filteredProducts : productsKeys;
    const renderFilteredProducts = filteredProductsByType.length > 0 ? filteredProductsByType : renderProducts;
    const renderSortedProducts = sortedProducts.length > 0 ? sortedProducts : renderFilteredProducts;

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const [selectedProductTypes, setSelectedProductTypes] = useState([]);

    const handleFilterChange = (e, section, option) => {
        console.log("section id:", section.id);
        console.log("option value:", option.value);

        const updatedOptions = section.options.map(opt =>
            opt.value === option.value ? { ...opt, checked: !opt.checked } : opt
        );

        section.options = updatedOptions;

        const selectedTypes = section.options
            .filter(opt => opt.checked)
            .map(opt => opt.value);

        setSelectedProductTypes(selectedTypes);

        axios.post('http://localhost:5001/auth/filterByType', { type: selectedTypes })
            .then(res => {
                console.log("API Response:", res);
                if (res.data.success) {
                    console.log("Data from API:", res.data.filteredProductType);
                    dispatch(setFilteredProductsByType(res.data.filteredProductType));
                }
            })
            .catch(err => {
                console.log("Error", err);
            })
    };

    const handleSortProduct = (e, option) => {
        console.log("sort frontend:", option)
        console.log("sort option:", option.sortBy);
        axios.post("http://localhost:5001/auth/sort", { sort: option.sortBy, filteredProducts: filteredProducts })
            .then(res => {
                console.log("API res:", res);
                if (res.data.success) {
                    console.log("API res data:", res.data.sortedProducts);
                    dispatch(setSortedProducts(res.data.sortedProducts));
                }
            })
            .catch(err => {
                console.log("Sort Error:", err);
            })
    };

    useEffect(() => {
        localStorage.setItem('filtered_product', JSON.stringify(filteredProducts));
    }, [filteredProducts]);

    useEffect(() => {
        dispatch(fetchAllProductsAsync());
    }, [dispatch]);

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>


                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            onChange={(e) => handleFilterChange(e, section, option)}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Product List</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <Link
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                            onClick={e => handleSortProduct(e, option)}
                                                        >
                                                            {option.name}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className=" pb-16 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    onChange={e => handleFilterChange(e, section, option)}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>


                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <div className="bg-white">
                                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-0">
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
                                            {renderSortedProducts.map((product) => (
                                                <Link key={product.id} to={`/productOverview/${product.id}`}>
                                                    <div
                                                        className="group relative border border-green-200 hover:border-green-500 hover:shadow-xl rounded"
                                                    >
                                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-44">
                                                            <Link to={`/productOverview/${product.id}`}>
                                                                <span aria-hidden="true" className="absolute inset-0" />
                                                                <img
                                                                    src={product.imageSrc}
                                                                    alt={product.imageAlt}
                                                                    className="h-20 w-full object-cover object-center lg:h-full lg:w-full"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="mt-4 mx-3">
                                                            <p className='text-xs text-gray-500'>{product.type}</p>
                                                            <h3 className="text-sm text-gray-900 font-bold">
                                                                <span className=''>{product.name}</span>
                                                            </h3>
                                                            <div className='flex'>
                                                                <Stack spacing={1}>
                                                                    <Rating
                                                                        name="half-rating-read"
                                                                        defaultValue={product.rating}
                                                                        precision={0.5}
                                                                        readOnly
                                                                        size='small'
                                                                    />
                                                                </Stack>
                                                                <span className='text-sm text-gray-500'>{product.rating}</span>
                                                                <p className="text-sm font-medium text-gray-900 ml-auto mb-3">
                                                                ₹{' '}{product.price}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <div className='border-t border-gray-200 mb-5'>
                    <Stack spacing={1} style={{ justifyContent: 'flex-end', alignItems: 'flex-start', flexDirection: 'row', marginTop: '20px' }}>
                        <Pagination count={10} />
                    </Stack>
                </div>
            </div>
        </div>
    )
}

