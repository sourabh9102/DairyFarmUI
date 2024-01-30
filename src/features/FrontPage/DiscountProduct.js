import React from 'react';
import discountProduct1 from '../../assets/images/discountProduct1.png';
import discountProduct2 from '../../assets/images/discountProduct2.png';
import discountProductBottom from '../../assets/images/discountProductBottom.png';
import discountProductSide from '../../assets/images/discountProductSide.png';
import './DiscountProduct.css'

function DiscountProduct() {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    };

    return (
        <>
            <div style={containerStyle}>
                <div className="mb-10 md:mx-5 sm:mx-5 hover15 column mt-10">
                    <div className="flex">
                        <div className="">
                            <figure><img src={discountProduct1} alt="Product Discount Image 1" className='transition-transform transform hover:scale-90' /></figure>
                            <figure><img src={discountProduct2} alt="Product Discount Image 2" className='transition-transform transform hover:scale-90' /></figure>
                        </div>
                        <div className="">
                            <figure><img src={discountProductSide} alt="Product Discount Side Image" className='transition-transform transform hover:scale-90' /></figure>
                        </div>
                    </div>
                    <div>
                        <figure><img src={discountProductBottom} alt="Product Discount Bottom Image" className='transition-transform transform hover:scale-90' /></figure>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DiscountProduct;
