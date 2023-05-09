import "./Home.css";
import React from "react";
import OfferCard from "../components/OfferCard";
import { Link } from "react-router-dom";

const Home = ({ offers }) => {
  return (
    <div className="home-container">
      <div className="whiteBox">
        <h1>Prêts à faire du tri dans vos placards ?</h1>
        <Link to="/publish">
          <button className="startToSellButton">Commencer à vendre</button>
        </Link>
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
