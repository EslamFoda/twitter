import { Link } from "react-router-dom";
const LikesNotifications = ({
  from,
  fullName,
  tweetId,
  username,
  profilePic,
  tweetDetails,
}) => {
  return (
    <>
      <div className="follow_card">
        <div className="avatar_container" style={{ marginRight: "0" }}>
          <img src={profilePic} alt="" />
        </div>
        <div className="text">
          {fullName.length > 15 ? (
            <Link to={`/profile/${from}`}>
              <span style={{ fontWeight: "bold", marginRight: ".5rem" }}>
                {fullName.substr(0, 15) + "..."}
              </span>
            </Link>
          ) : (
            <Link to={`/profile/${from}`}>
              {" "}
              <span style={{ fontWeight: "bold", marginRight: ".5rem" }}>
                {fullName}
              </span>
            </Link>
          )}
          <span>liked your Tweet</span>

          <Link to={`/tweet/${username}/${tweetId}`}>
            <p style={{ color: "var(--my-gray)" }}>{tweetDetails}</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LikesNotifications;
