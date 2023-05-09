import "./Payment.css";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams } from "react-router-dom";

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { state } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      const responseFromBackend = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        { stripeToken: stripeToken, title: state.title, amount: state.price }
      );

      if (responseFromBackend.data === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="paymentContainer" onSubmit={handleSubmit}>
      <h1>Formulaire de paiement</h1>
      <CardElement className="stripeContainer" />
      {completed ? (
        <p>Paiement validé</p>
      ) : (
        <button type="submit" disabled={isLoading}>
          Pay
        </button>
      )}
    </form>
  );
};
export default Payment;
