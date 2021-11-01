import { useEffect } from "react";
import "./UserProfileDetails.css";
import { database } from "../library/firebase";
import { useState } from "react";
import { formatDistance,format } from "date-fns";
import { getTweetsWithComments } from "../services/firebase";
const UserProfileDetails = ({ username }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = database
      .collection("users")
      .where("username", "==", username)
      .onSnapshot((snap) => {
        snap.docs.forEach((user) => {
          setUser(user.data());
        });
      });

    return () => unsub();
  }, [username]);

  useEffect(() => {
    async function getTweets() {
      let filteredTweets;
      let replies;
      const tweetsWithComments = await getTweetsWithComments();
      filteredTweets = tweetsWithComments.filter((document) => {
        return document.comments.length > 0;
      });
      if (user) {
        replies = filteredTweets.filter((d) =>
          d.comments.some((comment) => comment.userId === user.userId)
        );
        console.log(replies);
      }
    }
    getTweets();
  }, [user]);

  return (
    <>
      {user && (
        <div>
          <div className="profile_background_img"></div>
          <div className="user_profile_container">
            <div className="profile_header">
              <div className="profile_pic_container">
                <img
                  src={user.profilePic}
                  alt={`${user.username} profile pic`}
                />
              </div>
              <div className="profile_btns_container">
                <button className="profile_follow_btn">Follow</button>
              </div>
            </div>
            <div className="user_details_container">
              <h2>{user.fullName}</h2>
              <span style={{ color: "rgb(136, 153, 166)" }}>
                @{user.username}
              </span>
              <p style={{ margin: ".6rem 0" }} className="bio">
                iam software engineer bullshit
              </p>
              <div
                style={{
                  color: "rgb(136, 153, 166)",
                  display: "flex",
                  alignItems: "center",
                  margin: ".6rem 0",
                }}
              >
                <i
                  class="las la-calendar"
                  style={{ marginRight: ".3rem", fontSize: "1.3rem" }}
                ></i>
                <span>
                  Joined {formatDistance(user.createdAt, new Date())} ago
                </span>
              </div>
              <div className="follower_following_container">
                <div style={{ marginRight: "1rem" }}>
                  <span>
                    {user.following.length}{" "}
                    <span style={{ color: "rgb(136, 153, 166)" }}>
                      Following
                    </span>
                  </span>
                </div>
                <div>
                  <span>
                    {user.followers.length}{" "}
                    <span style={{ color: "rgb(136, 153, 166)" }}>
                      Followers
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileDetails;
