import { useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { Link } from "react-router-dom";
import "./User.css";
const User = () => {
  const { activeUser } = useCurrentUser();
  const [signoutModel, setSignoutModel] = useState(false);

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
              {activeUser && activeUser.fullName.length > 20 ? (
                <h5>{activeUser.fullName.substr(0, 20) + "..."}</h5>
              ) : (
                <h5>{activeUser.fullName}</h5>
              )}
              <p>@{activeUser.username}</p>
            </div>
            <div className="ellipsis-dots">
              <i
                style={{ color: "var(--light-blue)" }}
                className="las la-check"
              ></i>
            </div>
          </div>
          <Link to="/logout">
            <p className="model-logout-btn">Log out @{activeUser.username}</p>
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
            {activeUser.fullName.length > 13 ? (
              <h5>{activeUser.fullName.substr(0, 15) + "..."}</h5>
            ) : (
              <h5>{activeUser.fullName}</h5>
            )}
            <p>@{activeUser.username}</p>
          </div>
          <div className="ellipsis-dots">
            <i className="las la-ellipsis-h"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
