import "./Publish.css";
import { useState } from "react";
import axios from "axios";
import InputPublish from "../components/InputPublish";
import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [pictures, setPictures] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
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

      for (let i = 0; i < pictures.length; i++) {
        formData.append("picture", pictures[i]);
      }

      const response = await axios.post(
        "http://localhost:3000/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      setTitle("");
      setDescription("");
      setPrice(0);
      setCondition("");
      setCity("");
      setBrand("");
      setSize("");
      setColor("");
      setPictures([]);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlePictureChange = (event) => {
    const fileList = event.target.files;
    const newPictures = Array.from(fileList);
    setPictures(newPictures);
  };

  return token ? (
    <div className="publishContainer">
      <h2>Vends ton article</h2>
      <form onSubmit={handleSubmit} className="publishForm">
        <div>
          <div className="uploadPictureContainer">
            <label htmlFor="file">Ajoute des photos</label>
            <input
              style={{ display: "none" }}
              id="file"
              type="file"
              multiple
              onChange={handlePictureChange}
            />
          </div>
          <div className="thumbnailContainer">
            {pictures.map((picture, index) => (
              <img
                key={index}
                src={URL.createObjectURL(picture)}
                alt={`Product Thumbnail ${index}`}
                className="thumbnail"
              />
            ))}
          </div>
        </div>
        <div>
          <div className="publishFieldContainer">
            <InputPublish
              label="Title"
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
              state={size}
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
              type="number"
              placeholder="ex: 0.00 €"
              state={price}
              setState={setPrice}
            />
          </div>
          <div className="publishFieldContainer">
            <input type="checkbox" onChange={() => {}} />
            <p>Je suis intéressé(e) par les échanges</p>
          </div>
          <input type="submit" value="Ajouter" />
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
