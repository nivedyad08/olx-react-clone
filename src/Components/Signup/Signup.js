import React, { useEffect } from "react";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { useState, useContext } from "react";
import { FirebaseContext } from "../../store/Context";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameVal, setUsernameVal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVal, setEmailVal] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneVal, setPhoneVal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVal, setPasswordVal] = useState(false);
  const { firestore, auth } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailVal && phoneVal && passwordVal && usernameVal) {
      auth.createUserWithEmailAndPassword(email, password).then((res) => {
        res.user.updateProfile({ displayName: username }).then(() => {
          firestore
            .collection("users")
            .add({
              id: res.user.uid,
              username: username,
              phone: phone,
            })
            .then(() => {
              alert("User created succesfully !!");
              navigate("/login"); //navigate is  client-side routing
            })
            .catch((error) => {
              console.log("Error fetching user data:", error);
            });
        });
        //This updates the display name of the newly created user with the value of the username variable.
        // /updateProfile updates the display name of the newly created user with the value of the username variable.
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
    if (phone) {
      let regEx = /^[0-9]{10}$/;
      setPhoneVal(regEx.test(phone));
    }
    if (username) {
      let regEx = /^[a-zA-Z0-9_]{5,}$/;
      setUsernameVal(regEx.test(username));
    }
  }, [email, password, phone, username]);

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {!usernameVal && username ? (
            <>
              <br />
              <label style={{ color: "red", fontSize: "0.7rem" }}>
                Username is required
              </label>
            </>
          ) : (
            ""
          )}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {!phoneVal && phone ? (
            <>
              <br />
              <label style={{ color: "red", fontSize: "0.7rem" }}>
                Phone number is not valid
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
                Password is not valid
              </label>
            </>
          ) : (
            ""
          )}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
