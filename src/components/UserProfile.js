import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { database } from "../library/firebase";
import UserProfileDetails from "./UserProfileDetails";
import ProfileTabs from "./ProfileTabs";
import Spinner from "./Spinner";
const UserProfile = () => {
  const history = useHistory();
  const { username } = useParams();
  const [userTweets, setUserTweets] = useState(null);
  useEffect(() => {
    const unsub = database
      .collection("tweets")
      .where("username", "==", username)
      .onSnapshot((snap) => {
        const results = [];
        snap.docs.forEach((doc) => {
          results.push({ ...doc.data(), docId: doc.id });
        });
        setUserTweets(results);
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
          <i
            className="las la-arrow-left back-btn"
            onClick={() => {
              history.goBack();
            }}
          ></i>

          <div
            style={{
              marginLeft: "1rem",
              padding: ".5rem 0",
              lineHeight: "1.1",
            }}
          >
            <h3>{username}</h3>
            {userTweets && (
              <span
                style={{ color: "rgb(136, 153, 166)", fontSize: "smaller" }}
              >
                {userTweets.length} Tweets
              </span>
            )}
          </div>
        </div>
        {userTweets && (
          <div>
            <UserProfileDetails username={username} />
            <ProfileTabs username={username} />
          </div>
        )}
        {!userTweets && <Spinner></Spinner>}
      </div>
    </>
  );
};

export default UserProfile;
