import { Link } from "react-router-dom";
import "./Header.css";
import vintedIcon from "../assets/img/vinted_logo.jpg";

const Header = ({ handleToken, userToken }) => {
  return (
    <div className="container">
      <header>
        <div className="headerLogo">
          <Link to="/">
            <img src={vintedIcon} alt="Vinted logo" />
          </Link>
        </div>
        <form>
          <div className="search-label">
            <input
              className="search-input"
              type="search"
              placeholder="Recherche des articles"
            />
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
          <Link to="/publish">
            <button className="sellButton">Vends tes articles</button>
          </Link>
        </form>
      </header>
    </div>
  );
};
export default Header;
