import "./Tweet.css";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { database, FieldValue } from "../library/firebase";
import likeIcon from "../assets/like.svg";
import repliesIcon from "../assets/replies.svg";
import retweetIcon from "../assets/retweet.svg";
import shareIcon from "../assets/share.svg";
import verifiedIcon from "../assets/verified.svg";
import useCurrentUser from "../hooks/useCurrentUser";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import RemoveModel from "./RemoveModel";
import DeleteModelContext from "../context/DeleteModelContext";
import ReplieToTweet from "./ReplieToTweet";
const Tweet = ({
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
  userId,
  filePath,
  tweet,
  profilePic,
}) => {
  const { activeUser } = useCurrentUser();
  const history = useHistory();
  const { isOpen, setIsOpen, commentModel, setCommentModel } =
    useContext(DeleteModelContext);
  const [id, setId] = useState(null);
  const [tweetModel, setTweetModel] = useState(null);

  return (
    <>
      {commentModel && tweetModel && (
        <div>
          <div className="addtweet_model_overlay">
            <div className="addTweet_model_container">
              <div className="addtweet_model_header">
                <i
                  className="las la-times close_addmodel_btn"
                  onClick={() => {
                    setTweetModel(null);
                    setCommentModel(false);
                  }}
                ></i>
              </div>
              <div style={{ display: "flex", margin: "1rem" }}>
                <div className="avatar_container">
                  <img src={profilePic} alt="" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {tweetModel.fullName.length > 20 ? (
                      <span className="tweet_name">
                        {tweetModel.fullName.substr(0, 20) + "..."}
                      </span>
                    ) : (
                      <span className="tweet_name">{tweetModel.fullName}</span>
                    )}
                    {verified && (
                      <img
                        className="verified"
                        src={verifiedIcon}
                        alt="verified"
                      />
                    )}
                    <span className="tweet_username comment_model_username">
                      @{tweetModel.username} •
                    </span>

                    <span className="tweet_date comment_model_date">
                      {formatDistance(tweetModel.createdAt, new Date())}
                    </span>
                  </div>
                  <div style={{ marginTop: ".5rem" }}>
                    <p>{tweetModel.tweet}</p>
                  </div>
                </div>
              </div>
              <ReplieToTweet
                username={tweetModel.username}
                id={tweetModel.id}
              />
            </div>
          </div>
        </div>
      )}
      {id && <RemoveModel isOpen={isOpen} id={id} filePath={filePath} />}
      <div
        className="tweet"
        onClick={(e) => {
          if (
            e.target.classList.contains("la-ellipsis-h") ||
            e.target.classList.contains("more_btn")
          ) {
            setId(docId);
            setIsOpen(true);
          } else if (e.target.alt === "replies") {
            database
              .collection("tweets")
              .doc(docId)
              .onSnapshot((snap) => {
                if (snap.data() && snap.id) {
                  setTweetModel({ ...snap.data(), id: snap.id });
                }
              });
            setCommentModel(true);
          } else if (e.target.alt === "likes") {
          } else if (e.target.classList.contains("tweet_name")) {
          } else {
            history.push(`/tweet/${user}/${docId}`);
          }
        }}
      >
        <div className="avatar_container">
          <img src={profilePic} alt="" />
        </div>
        <div className="tweet_content">
          <div className="tweet_header">
            {name.length > 20 ? (
              <Link to={`/profile/${user}`} className="tweet_name">
                {name.substr(0, 20) + "..."}
              </Link>
            ) : (
              <Link to={`/profile/${user}`} className="tweet_name">
                {name}
              </Link>
            )}
            {verified && (
              <img className="verified" src={verifiedIcon} alt="verified" />
            )}
            <span className="tweet_username">@{user}</span>•
            <span className="tweet_date">
              {formatDistance(date, new Date())}
            </span>
            {activeUser && activeUser.userId === userId && (
              <div
                className="more_btn"
                onClick={() => {
                  setId(docId);
                }}
              >
                <i className="las la-ellipsis-h"></i>
              </div>
            )}
          </div>
          <p className="tweet_text">{text}</p>
          {image && (
            <div className='tweet_img_container'>
              <img className="tweet_image" src={image} alt={text} />
            </div>
          )}

          <div className="tweet_footer">
            <div className="icon_wrapper">
              <img className="footer_icon" src={repliesIcon} alt="replies" />{" "}
              <span>{replies}</span>
            </div>
            <div className="icon_wrapper">
              <img className="footer_icon" src={retweetIcon} alt="retweets" />{" "}
              <span>{retweets}</span>
            </div>
            {activeUser && likesArray.includes(activeUser.userId) ? (
              <div
                onClick={() => {
                  database
                    .collection("tweets")
                    .doc(docId)
                    .update({
                      likes: FieldValue.arrayRemove(activeUser.userId),
                    });
                }}
                className="icon_wrapper"
              >
                <img
                  className="footer_icon active-like"
                  src={likeIcon}
                  alt="likes"
                />{" "}
                <span style={{ color: "rgb(249, 24, 128)" }}>{likes}</span>
              </div>
            ) : (
              <div
                onClick={() => {
                  database
                    .collection("tweets")
                    .doc(docId)
                    .update({
                      likes: FieldValue.arrayUnion(activeUser.userId),
                    });

                  database.collection("likes").add({
                    profilePic: activeUser.profilePic,
                    fullName: activeUser.fullName,
                    from: activeUser.username,
                    tweetId: docId,
                    createdAt: Date.now(),
                    tweetDetails: text,
                    username: user,
                  });
                }}
                className="icon_wrapper"
              >
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

export default Tweet;
