import "./Payment.css";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NEIVRALprE2xxeANeFYTgjzgukp2xyh6Cdx3i7KD7l872qx33rpYfc58xNFq8cBv0b32uDILhbcmZ3UJoc5k1LF00FNH15AlG"
);

const Payment = () => {
  const userToken = Cookies.get("userToken");
  // console.log(userToken);
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  console.log(location);
  const title = location.state ? location.state.title : "";
  const price = location.state ? location.state.price : "";

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
        "http://localhost:3000/payment",
        { stripeToken: stripeToken, title: title, amount: price }
      );

      if (responseFromBackend.data === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return userToken ? (
    <form className="paymentContainer" onSubmit={handleSubmit}>
      <div>
        <h1>Résumé de la commande</h1>
        <p>Prix de la commande : {price} €</p>
        <p>Vous allez acheter : {title}</p>
        <CardElement className="stripeContainer" />
        {completed ? (
          <p>Paiement validé</p>
        ) : (
          <button type="submit" disabled={isLoading}>
            Pay
          </button>
        )}
      </div>
    </form>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
