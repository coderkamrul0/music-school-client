import React, { useEffect } from 'react';
import CheckOutForm from './CheckOutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE)




const Payment = () => {
    const item = useLoaderData()

    
    
    return (
        <div>
            <Helmet>
                <title>Music Universe | Payment</title>
            </Helmet>
            <h1 className='text-4xl font-bold text-center py-5'>Payment</h1>

            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm item={item}/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;