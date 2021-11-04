import { Link } from "react-router-dom";
const CommentsNotfication = ({
  from,
  fullName,
  notfication,
  createdAt,
  profilePic,
  tweetId,
  username,
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
              {fullName.substr(0, 15) + "..."}
            </Link>
          ) : (
            <Link to={`/profile/${from}`}>{fullName}</Link>
          )}
          <p>@{from}</p>
        </div>
      </div>
      <Link to={`/tweet/${username}/${tweetId}`}>
        <p style={{ margin: ".5rem 1rem" }}>{notfication}</p>
      </Link>
    </>
  );
};

export default CommentsNotfication;
