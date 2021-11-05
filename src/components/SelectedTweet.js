import "./Tweet.css";
import { formatDistance } from "date-fns";

import { database, FieldValue } from "../library/firebase";
import likeIcon from "../assets/like.svg";
import repliesIcon from "../assets/replies.svg";
import retweetIcon from "../assets/retweet.svg";
import verifiedIcon from "../assets/verified.svg";
import useCurrentUser from "../hooks/useCurrentUser";
import shareIcon from "../assets/share.svg";
import { Link } from "react-router-dom";
import RemoveModel from "./RemoveModel";
import DeleteModelContext from "../context/DeleteModelContext";
import "./SelectedTweet.css";
import ReplieToTweet from "./ReplieToTweet";
import { useContext } from "react";
import { useState } from "react";
const SelectedTweet = ({
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
  filePath,
  profilePic,
}) => {
  const { activeUser } = useCurrentUser();
  const { isOpen, setIsOpen, commentModel, setCommentModel } =
    useContext(DeleteModelContext);
  const [tweetModel, setTweetModel] = useState();
  

  return (
    <>
      {commentModel && tweetModel && (
        <div>
          <div className="addtweet_model_overlay">
            <div className="addTweet_model_container">
              <div className="addtweet_model_header">
                <i
                  class="las la-times close_addmodel_btn"
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
                    {tweetModel && tweetModel.fullName.length > 20 ? (
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
                  <div>
                    <h3>{tweetModel.tweet}</h3>
                  </div>
                </div>
              </div>
              <ReplieToTweet
                username={tweetModel.username}
                id={tweetModel.id}
                setCommentModel={setCommentModel}
              />
            </div>
          </div>
        </div>
      )}
      {docId && <RemoveModel isOpen={isOpen} id={docId} filePath={filePath} />}
      <div className="selected_tweet">
        <div style={{ display: "flex" }}>
          <div className="avatar_container">
            <img src={profilePic} alt="" />
          </div>
          <div className="tweet_header" style={{ width: "100%" }}>
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
            <div
              className="more_btn"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <i className="las la-ellipsis-h"></i>
            </div>
          </div>
        </div>
        <div className="tweet_content">
          <h3 className="selected_tweet_text">{text}</h3>
          {image && <img className="tweet_image" src={image} alt={text} />}
          <div className="tweet_likes_replies_container">
            <span className="selected_tweet_replies">
              <span style={{ color: "white", fontWeight: "bold" }}>
                {replies}{" "}
              </span>
              Replies
            </span>
            <span>
              <span style={{ color: "white", fontWeight: "bold" }}>
                {likes}{" "}
              </span>
              Likes
            </span>
          </div>
          <div className="tweet_footer">
            <div
              className="icon_wrapper"
              onClick={() => {
                database
                  .collection("tweets")
                  .doc(docId)
                  .onSnapshot((snap) => {
                    if (snap.data() && snap.id) {
                      setTweetModel({ ...snap.data(), id: snap.id });
                    }
                  });
                setCommentModel(true);
              }}
            >
              <img className="footer_icon" src={repliesIcon} alt="replies" />{" "}
            </div>
            <div className="icon_wrapper">
              <img className="footer_icon" src={retweetIcon} alt="retweets" />{" "}
              <span>{retweets}</span>
            </div>
            {activeUser && likesArray.includes(activeUser.userId) ? (
              <div
                onClick={() => {
                  let like = false;
                  database
                    .collection("tweets")
                    .doc(docId)
                    .update({
                      likes: like
                        ? FieldValue.arrayUnion(activeUser.userId)
                        : FieldValue.arrayRemove(activeUser.userId),
                    });
                }}
                className="icon_wrapper"
              >
                <img
                  className="footer_icon active-like"
                  src={likeIcon}
                  alt="likes"
                />{" "}
              </div>
            ) : (
              <div
                onClick={() => {
                  let like = true;
                  database
                    .collection("tweets")
                    .doc(docId)
                    .update({
                      likes: like
                        ? FieldValue.arrayUnion(activeUser.userId)
                        : FieldValue.arrayRemove(activeUser.userId),
                    });
                }}
                className="icon_wrapper"
              >
                <img className="footer_icon" src={likeIcon} alt="likes" />{" "}
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

export default SelectedTweet;
