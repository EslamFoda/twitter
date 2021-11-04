import { formatDistance } from "date-fns";
import { Link, useHistory } from "react-router-dom";
const CommentsNotfication = ({
  from,
  fullName,
  date,
  profilePic,
  tweetId,
  username,
  image,
  text,
}) => {
  const history = useHistory();
  return (
    <>
      <div
        className="tweet"
        style={{ borderBottom: "1px solid var(--blue-gray-light)" }}
      >
        <div className="avatar_container">
          <img src={profilePic} alt="" />
        </div>
        <div className="tweet_content">
          <div className="tweet_header">
            {fullName.length > 14 ? (
              <Link to={`/profile/${from}`} className="tweet_name">
                {fullName.substr(0, 14) + "..."}
              </Link>
            ) : (
              <Link to={`/profile/${from}`} className="tweet_name">
                {fullName}
              </Link>
            )}
            <span className="tweet_username">@{from}</span>•
            <span className="tweet_date">
              {formatDistance(date, new Date())}
            </span>
          </div>
          <span>
            Replying to{" "}
            <Link
              className="replay-to"
              to={`/profile/${username}`}
              style={{ color: "rgb(29, 155, 240)", cursor: "pointer" }}
            >
              @{username}
            </Link>
          </span>
          <div
            onClick={() => {
              history.push(`/tweet/${username}/${tweetId}`);
            }}
          >
            <p style={{ margin: ".5rem 0" }} className="tweet_text">
              {text}
            </p>
            {image && (
              <img
                style={{ marginBottom: "1rem" }}
                className="tweet_image"
                src={image}
                alt={text}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsNotfication;
