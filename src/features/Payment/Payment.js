import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Payment.css";
import { useSelector } from "react-redux";
import { selectCartProduct } from "../Cart/cartProductSlice";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51OryymSD2MHCmuStKHwt9eMVHw4fhO6uhxokN6dV6ZGqPT6uHQzMnxUhEgGydx8EhvIEeqgMLeb9IasLBlU68uJy00vSZUAsaY"
);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCartProduct);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios
      .post("http://localhost:5001/auth/createPaymentIntent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: currentOrder }),
      })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [currentOrder]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Payment">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
