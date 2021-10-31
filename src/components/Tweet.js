import "./Tweet.css";
import { formatDistance } from "date-fns";
import Avatar, { AvatarConfig, genConfig } from "react-nice-avatar";
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
  tweet
}) => {
  const config = genConfig(AvatarConfig);
  const { activeUser } = useCurrentUser();
  const history = useHistory();
  const { isOpen, setIsOpen, commentModel, setCommentModel } =
    useContext(DeleteModelContext);
  const [id, setId] = useState(null);
  const [tweetModel,setTweetModel] = useState(null)
  
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
                    setTweetModel(null)
                    setCommentModel(false);
                  }}
                ></i>
              </div>
              <div style={{ display: "flex", margin: "1rem" }}>
                <Avatar
                  style={{
                    width: "3rem",
                    height: "3rem",
                    marginRight: "1em",
                    flexShrink: "0",
                  }}
                  {...config}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span className="tweet_name">{tweetModel.fullName}</span>
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
              <ReplieToTweet username={tweetModel.username} id={tweetModel.id} />
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
          } else {
            history.push(`/tweet/${user}/${docId}`);
          }
        }}
      >
        <Avatar
          style={{
            width: "3rem",
            height: "3rem",
            marginRight: "1em",
            flexShrink: "0",
          }}
          {...config}
        />
        <div className="tweet_content">
          <div className="tweet_header">
            <span className="tweet_name">{name}</span>
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
          <pre className="tweet_text">{text}</pre>
          {image && <img className="tweet_image" src={image} alt={text} />}
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
                <span style={{ color: "rgb(249, 24, 128)" }}>{likes}</span>
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
