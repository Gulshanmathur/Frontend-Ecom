import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from '../features/order/orderSlice';
import "../Stripe.css"
import CheckoutForm from './CheckoutForm';
let stripePromise =  loadStripe('pk_test_51PyXGMRuOVbDRBVahQFgPqC5omGxOuZ9C0eJK5udzf12Kd9eNbnsaaMZ2IXvJDTR798qmrvx2Vxv4zFw7AubFZNY00jf1WCSF9');



const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    const createPaymentIntent = async () => {
             try {
        // Create a PaymentIntent as soon as the page loads
        const response = await fetch('http://localhost:8000/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ totalAmount: currentOrder.totalAmount, orderId: currentOrder.id }), // Amount in cents
          meta:{
            order_id : currentOrder.id
            // this info will go to stripe =>and then to our webhook
            // so we can conclude that payment was successfully, even if client close the window after pay
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok'); 
        }

        const data = await response.json();
        console.log({ data });
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };

    createPaymentIntent();
  }, [currentOrder]); // Add currentOrder as a dependency


  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance
  };

  return (
    <div className="Stripe">
      <h1>Stripe Payment Integration</h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm  />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;