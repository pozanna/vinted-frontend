import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Offer.css";
import { Link } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsAuthenticated(true);
      setLoggedIn(true);
    }
  }, [setIsAuthenticated]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="containerOffer">
      <div classname="productImageArea">
        <img
          className="productImageOffer"
          src={data.product_image.secure_url}
          alt=""
        />
      </div>
      <div className="whiteBoxOffer">
        <div className="whiteBoxAllInfo">
          <p className="offerPrice">{data.product_price} €</p>
          <div className="productDetailsOffer">
            {/* I browse product_details */}
            {data.product_details.map((detail, index) => {
              console.log(detail);
              // I get the name of the detail key
              const keyName = Object.keys(detail)[0];
              return (
                <div key={index} className="productDetailsOffer">
                  {/* I display the name of the key */}
                  <span>{keyName} : </span>
                  {/* and its contents */}
                  <span>{detail[keyName]}</span>
                </div>
              );
            })}
          </div>
          <h4>{data.product_name}</h4>
          <p className="productDescription">{data.product_description}</p>
          <div className="userInfoContainerOffer">
            <img src={data.owner.account.avatar?.url}></img>
            <p>{data.owner.account.username}</p>
          </div>
          <button className="buyButtonContainer">
            {isAuthenticated ? (
              <Link
                to={{
                  pathname: "/payment",
                  state: {
                    title: data.product_name,
                    price: data.product_price,
                  },
                }}
              >
                Acheter
              </Link>
            ) : (
              <Link to="/login">Acheter</Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
