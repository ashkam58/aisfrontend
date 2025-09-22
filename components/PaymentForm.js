import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Do NOT call loadStripe during SSR or with an undefined key — that can cause the Stripe bundle
// to attempt string operations on undefined (reading .match), which throws.
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

const PaymentForm = ({ userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setMessage('Stripe is not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      setMessage(error.message);
      return;
    }

    try {
      const response = await axios.post('/subscribe', { token: token.id, userId });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Payment failed.');
    }
  };

  return (
    <div className="payment-form">
      <h2>Subscribe</h2>
      <form onSubmit={handleSubmit}>
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        <button type="submit" disabled={!stripe}>Pay $100</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const PaymentWrapper = ({ userId }) => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    // initialize on client only when a key is available
    if (typeof window !== 'undefined' && stripeKey) {
      setStripePromise(loadStripe(stripeKey));
    }
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm userId={userId} />
    </Elements>
  );
};

export default PaymentWrapper;
