import { useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { Link } from "react-router-dom";
import "./MobileUser.css";
const MobileUser = () => {
  const { activeUser } = useCurrentUser();
  const [signoutModel, setSignoutModel] = useState(false);
  return (
    <>
      {activeUser && (
        <div className="mobile_user_container">
          <div
            onClick={() => setSignoutModel(!signoutModel)}
            className=" mobile_profile_img_container"
            style={{ marginRight: "1rem", cursor: "pointer" }}
          >
            {signoutModel && (
              <div className="logout_mobile">
                <Link to='/logout'>
                  <span style={{ fontSize: "1rem" }}>
                    Log out @{activeUser.username}
                  </span>
                </Link>
              </div>
            )}
            <img
              className="active-user-pic"
              src={activeUser.profilePic}
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileUser;
