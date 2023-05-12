import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FirebaseContext } from "./store/Context";
import Context from "./store/Context";
import { firestore, auth, storage } from "./config/firebase/firebase";
ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firestore, auth, storage }}>
      <Context>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
