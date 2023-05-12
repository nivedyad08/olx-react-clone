import React, { Fragment } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { useState } from "react";
import { FirebaseContext, AuthContext } from "../../store/Context";
import { useContext } from "react";
import { firestore } from "../../config/firebase/firebase";
import {useNavigate} from "react-router-dom"

const Create = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const { auth, storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const date = new Date();

  const handleProductSubmit = () => {
    var metadata = {
      contentType: 'image/jpeg'
    };
    const uploadTask = storage.ref(`/image/${image.name}`).put(image, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle upload error
        console.error(error);
      },
      () => {
        // Get download URL once upload is complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          firestore.collection("products").add({
              name,
              category,
              price,
              downloadURL,
              userId: user.uid,
              createdAt: date.toDateString(),
            })
            alert("Product uploaded succesfully!!")
            navigate("/")
        });
      }
    );

    // storage
    //   .ref(`/image/${image.name}`)
    //   .put(image)
    //   .then((storageRef) => {
    //     storageRef
    //       .getDownloadURL()
    //       .then((url) => {
    //         console.log(url);
    //         // firestore.collection("products").add({
    //         //   name,
    //         //   category,
    //         //   price,
    //         //   url,
    //         //   userId: user.uid,
    //         //   createdAt: date.toDateString(),
    //         // });
    //       })
    //       .catch((error) => {
    //         console.error("Upload failed:", error);
    //       });
    //   });
  };
  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fcategory">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fcategory"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fprice"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <br />
          <button onClick={handleProductSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </>
  );
};

export default Create;
