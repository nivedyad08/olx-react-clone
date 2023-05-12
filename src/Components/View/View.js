import React, { useEffect, useState } from "react";

import "./View.css";
import { useContext } from "react";
import { PostContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/Context";
function View() {
  const [userDetails,setUserDetails   ] = useState();
  const { postDetails } = useContext(PostContext);
  const { firestore } = useContext(FirebaseContext);
  useEffect(() => {
    const { userId } = postDetails;
    firestore
      .collection("users")
      .where('id', "==", userId)
      .get().then((res) => {
        res.forEach(doc=>{
          setUserDetails(doc.data())
          console.log(userDetails);
        })
      });
  },[]);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.downloadURL} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
