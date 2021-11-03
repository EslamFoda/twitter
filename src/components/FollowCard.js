import "./FollowCard.css";
import Avatar, { AvatarConfig, genConfig } from "react-nice-avatar";
import { Link } from "react-router-dom";
import { database, FieldValue } from "../library/firebase";
import useCurrentUser from "../hooks/useCurrentUser";
const FollowCard = ({ fullName, username, id, docId, profilePic }) => {
  const config = genConfig(AvatarConfig);
  const { activeUser } = useCurrentUser();
  return (
    <>
      <div className="follow_card">
        <div className="avatar_container">
          <img src={profilePic} alt="" />
        </div>
        <div className="text">
          {fullName.length > 15 ? (
            <Link to={`/profile/${username}`}>
              {fullName.substr(0, 15) + "..."}
            </Link>
          ) : (
            <Link to={`/profile/${username}`}>{fullName}</Link>
          )}
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

export default FollowCard;
