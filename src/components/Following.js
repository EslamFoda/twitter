import "./FollowCard.css";
import useCurrentUser from "../hooks/useCurrentUser";
import { database, FieldValue } from "../library/firebase";
import Avatar, { AvatarConfig, genConfig } from "react-nice-avatar";
import { Link } from "react-router-dom";
const Following = ({ fullName, username, id, docId }) => {
  const config = genConfig(AvatarConfig);
  const {activeUser} = useCurrentUser()

  return (
    <>
      <div className="follow_card">
        <Avatar style={{ width: "3rem", height: "3rem" }} {...config} />
        <div className="text">
          <Link to={`/profile/${username}`}>{fullName}</Link>
          <p>@{username}</p>
        </div>
        {activeUser &&
          activeUser.userId !== id &&
          !activeUser.following.includes(id) && (
            <button
              className="profile_follow_btn"
              onClick={() => {
                database
                  .collection("users")
                  .doc(activeUser.docId)
                  .update({
                    following: FieldValue.arrayUnion(id),
                  });
                  console.log(docId)
                database
                  .collection("users")
                  .doc(docId)
                  .update({
                    followers: FieldValue.arrayUnion(activeUser.userId),
                  });
              }}
            >
              Follow
            </button>
          )}
        {activeUser && activeUser.following.includes(id) && (
          <button
            className="following_btn flw-btn"
            onClick={() => {
              console.log(docId);
              database
                .collection("users")
                .doc(activeUser.docId)
                .update({
                  following: FieldValue.arrayRemove(id),
                });
              database
                .collection("users")
                .doc(docId)
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
    </>
  );
};

export default Following;
