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
}) => {
  const config = genConfig(AvatarConfig);
  const { activeUser } = useCurrentUser();
  

  return (
    <div className="tweet">
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
          <span className="tweet_date">{formatDistance(date, new Date())}</span>
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
                let like = false
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
              <span>{likes}</span>
            </div>
          ) : (
            <div
              onClick={() => {
                let like = true
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
                className="footer_icon"
                src={likeIcon}
                alt="likes"
              />{" "}
              <span>{likes}</span>
            </div>
          )}
          <div className="icon_wrapper">
            <img className="footer_icon" src={shareIcon} alt="share" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
