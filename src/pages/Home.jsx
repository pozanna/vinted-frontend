import "./Home.css";
import React from "react";
import OfferCard from "../components/OfferCard";

const Home = ({ offers }) => {
  return (
    <div className="home-container">
      <div className="whiteBox">
        <h1>Prêts à faire du tri dans vos placards ?</h1>
        <button
          className="startToSellButton"
          onClick={() => {
            console.log("click commencer a vendre");
          }}
        >
          Commencer à vendre
        </button>
      </div>
      <div className="offers-container">
        {offers?.map((offer) => (
          <OfferCard key={offer._id} offerData={offer} />
        ))}
      </div>
    </div>
  );
};

export default Home;
