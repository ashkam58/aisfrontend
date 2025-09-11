import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

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

const PaymentWrapper = ({ userId }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm userId={userId} />
  </Elements>
);

export default PaymentWrapper;
