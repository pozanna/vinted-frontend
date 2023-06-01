import { useNavigate } from "react-router-dom";
import "../components/OfferCard.css";

const OfferCard = ({ offerData }) => {
  const {
    owner,
    product_image,
    product_price,
    product_name,
    product_details,
    _id,
  } = offerData;

  const handleClick = (id) => {
    navigate(`/offers/${id}`);
  };
  const navigate = useNavigate();
  //   const taille = product_details.find((elem) => elem.TAILLE);
  //   console.log(taille);
  return (
    <div key={_id} className="offer-card" onClick={() => handleClick(_id)}>
      <div className="userInfoContainer">
        {/* <img src={owner.account.avatar?.url}></img> */}
        {/* <p>{owner.account.username}</p> */}
      </div>
      <div className="mainItemImage">
        <img src={product_image.secure_url} alt={product_name} />
      </div>
      <p className="productPrice">{product_price} €</p>
      {product_details.map((product_detail, index) => {
        return (
          <div key={index} className="productDetailsContainer">
            <p>{product_detail.TAILLE}</p> <p>{product_detail.MARQUE}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OfferCard;
