import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllProductByIdAsync, selectProductById } from './productSlice';

export default function ProductOverview() {
    const dispatch = useDispatch();
    const params = useParams();
    const product = useSelector(selectProductById);
    const [isProductLoaded, setIsProductLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchAllProductByIdAsync(params.productId.toString()));
    }, [dispatch, params.productId]);

    useEffect(() => {
        // Check if product is loaded
        if (product) {
            setIsProductLoaded(true);
        }
    }, [product]);

    if (!isProductLoaded) {
        return <div>Loading...</div>;
    }
    

    


    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">${product.price}</p>
                        </div>

                        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                            <div className="grid grid-cols-4 gap-6">
                                {product.images && product.images.map((image) => (
                                    <div
                                        key={image.id}
                                        className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                                    >
                                        <span className="sr-only">{image.name}</span>
                                        <span className="absolute inset-0 rounded-md overflow-hidden">
                                            <img src={image.src} alt={image.alt} className="w-full h-full object-center object-cover sm:rounded-lg" />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
