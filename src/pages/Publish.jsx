import "./Publish.css";
import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState();
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState("");

  console.log(token);
  return (
    <div className="publishContainer">
      <h2>Vends ton article </h2>
      <form
        className="publishForm"
        onSubmit={async (event) => {
          event.preventDefault();
          setErrorMessage("");
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              {
                title: title,
                description: description,
                price: price,
                condition: condition,
                city: city,
                brand: brand,
                size: size,
                color: color,
                picture: picture,
              },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
          } catch (error) {}
        }}
      >
        <div className="uploadPictureContainer">
          <p>Ajoute une photo</p>
          <input
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
        </div>
        <div>
          <h5>Title</h5>
          <input
            type="text"
            placeholder="ex: chemise Zara verte"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            value={title}
          />
          <h5>Décris ton article</h5>
          <input
            type="text"
            placeholder="ex: porté quelquefois, taille correctement"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
          />
          <h5>Marque</h5>
          <input
            type="text"
            placeholder="ex: Zara"
            onChange={(event) => {
              setBrand(event.target.value);
            }}
            value={brand}
          />
          <h5>Taille</h5>
          <input
            type="number"
            placeholder="ex: L/40/12"
            onChange={(event) => {
              setSize(event.target.value);
            }}
            value={size}
          />
          <h5>Couleur</h5>
          <input
            type="text"
            placeholder="ex: Verte"
            onChange={(event) => {
              setColor(event.target.value);
            }}
            value={color}
          />
          <h5>Etat</h5>
          <input
            type="text"
            placeholder="Neuf avec étiquette"
            onChange={(event) => {
              setCondition(event.target.value);
            }}
            value={condition}
          />
          <h5>Lieu</h5>
          <input
            type="text"
            placeholder="ex: Paris"
            onChange={(event) => {
              setCity(event.target.value);
            }}
            value={city}
          />
          <h5>Prix</h5>
          <input
            type="price"
            placeholder="ex: 0.00 €"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            value={price}
          />
          <input type="checkbox" onChange={() => {}} />
        </div>
        <input type="submit" value="Ajouter" />
      </form>
    </div>
  );
};

export default Publish;
