import "./Signup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username,
          email,
          password,
          newsLetter: newsLetter,
        }
      );

      handleToken(response.data.token);
      navigate("/");
      handleToken(response.data.token);
    } catch (error) {
      console.log(error);
    }
    console.log(response.data);
  };

  return (
    <form className="signup-container" onSubmit={handleSubmit}>
      <h1>S'insrire</h1>
      <input
        type="text"
        placeholder="Nome d'utilisateur "
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Mot de passe"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <div className="checkBox">
        <input
          type="checkbox"
          checked={newsLetter}
          onChange={() => {
            setNewsLetter(!newsLetter);
          }}
        />{" "}
        <h3> S'inscrire à notre newsletter</h3>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
      </div>
      <input type="submit" value="S'inscrire" />
    </form>
  );
};

export default Signup;
