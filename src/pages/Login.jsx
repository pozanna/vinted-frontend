import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: email,
        password: password,
      });
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <h1>Se connecter</h1>
      <input
        className="inputEmail"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      ></input>
      <input
        className="inputPassowrd"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      ></input>
      <input className="submitButtom" type="submit" value="Connection" />
      <p className="inscris-toi">
        Pas ecnore de compte?
        <Link className="inscris-toi-link" to="/signup">
          Inscris-toi !
        </Link>
      </p>
    </form>
  );
};

export default Login;
