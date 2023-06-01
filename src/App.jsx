import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

//pages
import Home from "./pages/Home";
import Header from "./components/Header";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import { Elements } from "@stripe/react-stripe-js";

const App = () => {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [offers, setOffers] = useState([]);
  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );
  useEffect(() => {
    axios
      .get("http://localhost:3000/offers")
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  const handleSearch = (value) => {
    if (offers.offers) {
      setOffers({
        offers: offers.offers.filter((offer) =>
          offer.product_name.includes(value)
        ),
      });
    }
  };

  return (
    <div className="container">
      <Router>
        <Header
          handleToken={handleToken}
          userToken={userToken}
          handleSearch={handleSearch}
        />
        <Routes>
          <Route path="/" element={<Home offers={offers.offers} />} />
          <Route path="/offers/:id" element={<Offer token={userToken} />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route path="/publish" element={<Publish token={userToken} />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment token={userToken} />
              </Elements>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
