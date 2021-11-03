import "./AddTweetModel.css";
import ReplieToTweet from "./ReplieToTweet";
import { formatDistance } from "date-fns";
import verifiedIcon from "../assets/verified.svg";
import Avatar, { AvatarConfig, genConfig } from "react-nice-avatar";
const AddCommentModel = ({
  commentModel,
  setCommentModel,
  id,
  username,
  fullName,
  modelText,
  modelDate,
  verified,
}) => {
    const config = genConfig(AvatarConfig);
  return (
    <>
      {commentModel && (
        <div>
          <div className="addtweet_model_overlay">
            <div className="addTweet_model_container">
              <div className="addtweet_model_header">
                <i
                  class="las la-times close_addmodel_btn"
                  onClick={() => {
                    setCommentModel(false)}}
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
                <div style={{display:'flex',flexDirection:'column'}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                  <span className="tweet_name">{fullName}</span>
                  {verified && (
                    <img
                      className="verified"
                      src={verifiedIcon}
                      alt="verified"
                    />
                  )}
                  <span className="tweet_username comment_model_username">
                    @{username} •
                  </span>

                  <span className="tweet_date comment_model_date">
                    {formatDistance(modelDate, new Date())}
                  </span>
                    </div>
                  <div>
                <p>{modelText}</p>
                  </div>
                </div>
              </div>
              <ReplieToTweet username={username} id={id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCommentModel;
