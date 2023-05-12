import React from "react";

import Logo from "../../olx-logo.png";
import "./Login.css";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { FirebaseContext } from "../../store/Context";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailVal, setEmailVal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVal, setPasswordVal] = useState(false);
  const { firestore, auth } = useContext(FirebaseContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (emailVal && passwordVal) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          alert("Logged In");
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  useEffect(() => {
    if (email) {
      const regEx = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
      setEmailVal(regEx.test(email));
    }
    if (password) {
      let regEx = /((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/i;
      setPasswordVal(regEx.test(password));
    }
  });
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!emailVal && email ? (
            <>
              <br />
              <label style={{ color: "red", fontSize: "0.7rem" }}>
                Email does'nt match
              </label>
            </>
          ) : (
            ""
          )}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!passwordVal && password ? (
            <>
              <br />
              <label style={{ color: "red", fontSize: "0.7rem" }}>
                Password does'nt match
              </label>
            </>
          ) : (
            ""
          )}
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
