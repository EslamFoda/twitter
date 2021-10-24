import { useEffect, useState } from "react";
import useAuth from "../hooks/user-auth";
import { database } from "../library/firebase";
import { Link } from "react-router-dom";
import './User.css'
const User = () => {
    const [activeUser,setActiveUser] = useState(null)
    const [signoutModel,setSignoutModel] = useState(false)
    const {user} = useAuth()
  
    useEffect(() => {
      const unsub = database
        .collection("users")
        .where("userId", "==", user.uid)
        .onSnapshot((snap) => {
          snap.docs.forEach((doc) => {
            setActiveUser({ ...doc.data(), docId: doc.id });
          });
        });

      return () => unsub();
    }, [user]);
    
    
    return (
      <div className="active-user">
        {activeUser && signoutModel && (
          <div className="signout-model">
            <div className="model-user-container">
              <div className="model-pic-container">
                <img
                  className="model-user-pic"
                  src={activeUser.profilePic}
                  alt=""
                />
              </div>
              <div className="active-user-details">
                <h5>{activeUser.fullName}</h5>
                <p>@{activeUser.username}</p>
              </div>
              <div className="ellipsis-dots">
                <i
                  style={{ color: "var(--light-blue)" }}
                  className="las la-check"
                ></i>
              </div>
            </div>
            <Link to='/logout'>
            <p className="model-logout-btn">
               Log out @{activeUser.username}
            </p>
            </Link>
          </div>
        )}
        {activeUser && (
          <div
            className="active-user-container"
            onClick={() => setSignoutModel(!signoutModel)}
          >
            <div className="profile-pic-container">
              <img
                className="active-user-pic"
                src={activeUser.profilePic}
                alt=""
              />
            </div>
            <div className="active-user-details">
              <h5>{activeUser.fullName}</h5>
              <p>@{activeUser.username}</p>
            </div>
            <div className="ellipsis-dots">
              <i className="las la-ellipsis-h"></i>
            </div>
          </div>
        )}
      </div>
    );
}
 
export default User;