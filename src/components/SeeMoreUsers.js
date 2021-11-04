import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FollowCard from "./FollowCard";
import { database } from "../library/firebase";
import Spinner from "./Spinner";
const SeeMoreUsers = () => {
  const [allUsers, setAllUsers] = useState(null);
  useEffect(() => {
    const unsub = database.collection("users").onSnapshot((snap) => {
      let result = [];
      snap.docs.forEach((user) => {
        result.push({ ...user.data(), docId: user.id });
      });
      setAllUsers(result);
    });
    return () => unsub();
  }, []);
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
          <Link to="/home">
            <i className="las la-arrow-left back-btn"></i>
          </Link>
          <div
            style={{
              marginLeft: "1rem",
              padding: ".5rem 0",
              lineHeight: "1.1",
            }}
          >
            <h3 style={{ padding: ".6rem 0" }}>Connect</h3>
          </div>
        </div>
        <h3 style={{ borderBottom: "none", margin: "1rem" }}>
          Suggested for you
        </h3>
        {allUsers &&
          allUsers.map((user) => (
            <div key={user.docId} style={{ borderBottom: "none" }}>
              <FollowCard
                fullName={user.fullName}
                username={user.username}
                id={user.userId}
                docId={user.docId}
                profilePic={user.profilePic}
              />
            </div>
          ))}
          {!allUsers && <Spinner></Spinner>}
      </div>
    </>
  );
};

export default SeeMoreUsers;
