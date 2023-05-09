import "./Publish.css";
import { useState } from "react";
import axios from "axios";
import InputPublish from "../components/InputPublish";
import { Navigate } from "react-router-dom";

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
  return token ? (
    <div className="publishContainer">
      <h2>Vends ton article </h2>
      <form
        className="publishForm"
        onSubmit={async (event) => {
          event.preventDefault();
          setErrorMessage("");
          try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("picture", picture);
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(response.data);
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        <div>
          <div className="uploadPictureContainer">
            <label htmlFor="file">Ajoute une photo</label>
            <input
              style={{ display: "none" }}
              id="file"
              type="file"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />
          </div>
          {picture && <img src={URL.createObjectURL(picture)} alt="product" />}
        </div>
        <div>
          <div className="publishFieldContainer">
            <InputPublish
              label="Titre"
              type="text"
              placeholder="ex: chemise Zara verte"
              state={title}
              setState={setTitle}
            />
          </div>
          <div className="publishFieldContainer">
            <InputPublish
              label="Décris ton article"
              type="text"
              placeholder="ex: porté quelquefois, taille correctement"
              state={description}
              setState={setDescription}
              textArea={true}
            />
          </div>
          <div className="publishFieldContainer">
            <InputPublish
              label="Marque"
              type="text"
              placeholder="ex: Zara"
              state={brand}
              setState={setBrand}
            />
          </div>
          <div className="publishFieldContainer">
            <InputPublish
              label="Taille"
              type="number"
              placeholder="ex: L/40/12"
              tate={size}
              setState={setSize}
            />
          </div>
          <div className="publishFieldContainer">
            <InputPublish
              label="Couleur"
              type="text"
              placeholder="ex: Verte"
              state={color}
              setState={setColor}
            />
          </div>
          <div className="publishFieldContainer">
            <InputPublish
              label="État"
              type="text"
              placeholder="Neuf avec étiquette"
              state={condition}
              setState={setCondition}
            />
          </div>
          <div className="publishFieldContainer">
            <InputPublish
              label="Lieu"
              type="text"
              placeholder="ex: Paris"
              state={city}
              setState={setCity}
            />
          </div>
          <div className="publishFieldContainer">
            <InputPublish
              label="Prix"
              type="price"
              placeholder="ex: 0.00 €"
              state={price}
              setState={setPrice}
            />
          </div>
          <input type="checkbox" onChange={() => {}} />{" "}
          <p>Je suis intéressé(e) par les échanges</p>
        </div>
        <input type="submit" value="Ajouter" />
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
