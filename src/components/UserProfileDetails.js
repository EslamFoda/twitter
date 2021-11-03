import { useEffect } from "react";
import "./UserProfileDetails.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import { formatDistance } from "date-fns";
import { database, FieldValue } from "../library/firebase";
const UserProfileDetails = ({ username }) => {
  const { activeUser } = useCurrentUser();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = database
      .collection("users")
      .where("username", "==", username)
      .onSnapshot((snap) => {
        snap.docs.forEach((user) => {
          setUser({ ...user.data(), docId: user.id });
        });
      });
    return () => unsub();
  }, [username]);

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
               {activeUser && activeUser.userId === user.userId && <button className="edit_btn">
                  Edit Profile
                </button>}
                {activeUser &&
                  user &&
                  activeUser.userId !== user.userId &&
                  !activeUser.following.includes(user.userId) && (
                    <button
                      className="profile_follow_btn"
                      onClick={() => {
                        database
                          .collection("users")
                          .doc(activeUser.docId)
                          .update({
                            following: FieldValue.arrayUnion(user.userId),
                          });
                        database
                          .collection("users")
                          .doc(user.docId)
                          .update({
                            followers: FieldValue.arrayUnion(activeUser.userId),
                          });
                      }}
                    >
                      Follow
                    </button>
                  )}
                {activeUser && activeUser.following.includes(user.userId) && (
                  <button
                    className="profile_follow_btn following_btn"
                    onClick={() => {
                      console.log(activeUser);
                      database
                        .collection("users")
                        .doc(activeUser.docId)
                        .update({
                          following: FieldValue.arrayRemove(user.userId),
                        });
                      database
                        .collection("users")
                        .doc(user.docId)
                        .update({
                          followers: FieldValue.arrayRemove(activeUser.userId),
                        });
                    }}
                  >
                    <span className="following_text">Following</span>
                    <span className="unfollow_text">UnFollow</span>
                  </button>
                )}
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
                  className="las la-calendar"
                  style={{ marginRight: ".3rem", fontSize: "1.3rem" }}
                ></i>
                <span>
                  Joined {formatDistance(user.createdAt, new Date())} ago
                </span>
              </div>
              <div className="follower_following_container">
                <Link
                  to={`/profile/${username}/following`}
                  style={{ marginRight: "1rem" }}
                >
                  <span>
                    {user.following.length}{" "}
                    <span style={{ color: "rgb(136, 153, 166)" }}>
                      Following
                    </span>
                  </span>
                </Link>
                <Link to={`/profile/${username}/followers`}>
                  <span>
                    {user.followers.length}{" "}
                    <span style={{ color: "rgb(136, 153, 166)" }}>
                      Followers
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileDetails;
