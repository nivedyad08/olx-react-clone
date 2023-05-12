import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext, FirebaseContext } from "./store/Context";
import Post from "./store/PostContext";
/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Create from "./Components/Create/Create";
import View from "./Components/View/View";

function App() {
  const { setUser } = useContext(AuthContext);
  const { firestore, auth } = useContext(FirebaseContext);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Post>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="create" element={<Create />} />
        <Route path="view-post" element={<View />} />
      </Routes>
    </Post>

    /* <button
        onClick={async () => {
          //add
          // firestore.collection('products').add({
          //   name: 'Redmi',
          //   price:52000
          // })
          //delete
          // const res = await firestore.collection('products').doc('G1zJfZFId0tQZo3M1BDC').delete();

          // const dataRef = firestore.collection("products");
          // const snapshot = await dataRef.get();
          // snapshot.forEach((obj)=>{
          //   console.log(obj.data());
          // })
          // auth.createUserWithEmailAndPassword("neethu@gmail.com", "123456")
          //   .then((userCredential) => {
          //     // Signed in
          //     var user = userCredential.user;
          //     console.log(user);
          //     firestore.collection("products").get().then((snapshot) => {
          //       snapshot.forEach((obj)=>{
          //         console.log(obj.data());
          //       });
          //     });
          //   })
          //   .catch((error) => {
          //     var errorCode = error.code;
          //     var errorMessage = error.message;
          //     // ..
          //   });
          // Create a root reference
          var storageRef = firestore.storage().ref();
          // 'file' comes from the Blob or File API
          storageRef.put('https://imglarger.com/Images/before-after/ai-image-enlarger-1-after-2.jpg').then((snapshot) => {
            console.log("Uploaded a blob or file!");
          });
          console.log(storageRef);
        }}
      >
        Click me
      </button> */
    /* <button onClick={()=>{

        Firebase.firestore().collection('products').get().then(snapshot=>{
          snapshot.forEach((obj)=>{
            console.log(obj.data);
          })
        }
      }}>Click Me</button> */
  );
}

export default App;
