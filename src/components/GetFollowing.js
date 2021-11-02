import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { database } from "../library/firebase";
import FollowingTab from "./FollowingTab";
const GetFollowing = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = database
      .collection("users")
      .where("username", "==", username)
      .onSnapshot((snap) => {
        snap.docs.forEach((doc) => {
          setUser(doc.data());
        });
      });

    return () => unsub();
  }, [username]);
  return (
    <>
      <div className="mainsection">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "sticky",
            top: "0",
            left: "0",
            zIndex: "20",
            background: "rgb(21, 32, 43)",
          }}
        >
          <Link to={`/profile/${username}`}>
            <i className="las la-arrow-left back-btn"></i>
          </Link>
          {user && (
            <div
              style={{
                marginLeft: "1rem",
                padding: ".5rem 0",
                lineHeight: "1.1",
              }}
            >
              <h3>{user.fullName}</h3>

              <span
                style={{ color: "rgb(136, 153, 166)", fontSize: "smaller" }}
              >
                @{user.username}
              </span>
            </div>
          )}
        </div>
        {user && <FollowingTab user={user} />}
      </div>
    </>
  );
};
export default GetFollowing;
