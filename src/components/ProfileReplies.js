import "./Tweet.css";
import { formatDistance } from "date-fns";

import { database, storage } from "../library/firebase";
import likeIcon from "../assets/like.svg";
import repliesIcon from "../assets/replies.svg";
import retweetIcon from "../assets/retweet.svg";
import shareIcon from "../assets/share.svg";
import { Link } from "react-router-dom";
import verifiedIcon from "../assets/verified.svg";
import useCurrentUser from "../hooks/useCurrentUser";

const ProfileReplies = ({
  name,
  user,
  date,
  text,
  replies,
  retweets,
  likes,
  image,
  verified,
  docId,
  likesArray,
  commentsArray,
  commentId,
  filePath,
  reply,
  profilePic
}) => {
 
  const { activeUser } = useCurrentUser();

  const handleDeleteComment = async () => {
    const deleteComment = commentsArray.filter((comment) => {
      return comment.id !== commentId;
    });
    if (filePath) {
      const storageRef = storage.ref(filePath);
      await storageRef.delete();
    }
    await database
      .collection("tweets")
      .doc(docId)
      .update({ comments: deleteComment });
  };

  const addLike = () => {
    const newArrayOfComments = commentsArray.map((comment) => {
      if (comment.id === commentId) {
        comment.likes.push(activeUser.userId);
      }
      return comment;
    });
    database.collection("tweets").doc(docId).update({
      comments: newArrayOfComments,
    });
  };

  const removeLike = () => {
    const newArrayOfComments = commentsArray.map((comment) => {
      if (comment.id === commentId) {
        comment.likes.pop();
      }
      return comment;
    });
    database.collection("tweets").doc(docId).update({
      comments: newArrayOfComments,
    });
  };

  return (
    <>
      <div className="tweet">
        <div className="avatar_container">
          <img src={profilePic} alt="" />
        </div>
        <div className="tweet_content">
          <div className="tweet_header">
            <Link to={`/profile/${user}`} className="tweet_name">
              {name}
            </Link>
            {verified && (
              <img className="verified" src={verifiedIcon} alt="verified" />
            )}
            <span className="tweet_username">@{user}</span>???
            <span className="tweet_date">
              {formatDistance(date, new Date())}
            </span>
            <div className="more_btn" onClick={handleDeleteComment}>
              <i className="las la-trash-alt"></i>
            </div>
          </div>
          <span>
            Replying to{" "}
            <Link
              to={`/profile/${reply}`}
              style={{ color: "rgb(29, 155, 240)", cursor: "pointer" }}
            >
              @{reply}
            </Link>
          </span>
          <pre className="tweet_text">{text}</pre>
          {image && <img className="tweet_image" src={image} alt={text} />}
          <div className="tweet_footer">
            <div className="icon_wrapper" onClick={() => console.log("yes")}>
              <img className="footer_icon" src={repliesIcon} alt="replies" />{" "}
              <span>{replies}</span>
            </div>
            <div className="icon_wrapper">
              <img className="footer_icon" src={retweetIcon} alt="retweets" />{" "}
              <span>{retweets}</span>
            </div>
            {activeUser && likesArray.includes(activeUser.userId) ? (
              <div onClick={removeLike} className="icon_wrapper">
                <img
                  className="footer_icon active-like"
                  src={likeIcon}
                  alt="likes"
                />{" "}
                <span style={{ color: "rgb(249, 24, 128)" }}>{likes}</span>
              </div>
            ) : (
              <div onClick={addLike} className="icon_wrapper">
                <img className="footer_icon" src={likeIcon} alt="likes" />{" "}
                <span>{likes}</span>
              </div>
            )}
            <div className="icon_wrapper">
              <img className="footer_icon" src={shareIcon} alt="share" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileReplies;
