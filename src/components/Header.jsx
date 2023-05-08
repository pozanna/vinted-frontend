import { Link } from "react-router-dom";
import "../components/OfferCard.css";
import vintedIcon from "../assets/img/vinted_logo.jpg";

const Header = ({ handleToken, userToken }) => {
  return (
    <div className="container">
      <header>
        <div className="headerLogo">
          <img src={vintedIcon} alt="Vinted logo" />
        </div>
        <form>
          <div className="search-label">
            {/* <button className="search-button" type="submit">
              Press here
            </button> */}
            <input className="search-input" type="search" />
            {!userToken ? (
              <>
                <Link to="/signup">
                  <button className="subscribeButton">S'inscrir</button>
                </Link>
                <Link to="/login">
                  <button className="connectButton">Se connecter</button>
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleToken(null);
                }}
                className="disconnectButton"
              >
                Disconnection
              </button>
            )}
          </div>
          {/* <button className="sellButton">Vends tes articles</button> */}
        </form>
      </header>
    </div>
  );
};
export default Header;
