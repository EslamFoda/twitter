import "./WhatsHappening.css";
import { useRef, useState } from "react";
import Avatar, { AvatarConfig, genConfig } from "react-nice-avatar";

import emojiIcon from "../assets/emoji.svg";
import gifIcon from "../assets/gif.svg";
import mediaIcon from "../assets/media.svg";
import { database, storage ,FieldValue } from "../library/firebase";
import useCurrentUser from "../hooks/useCurrentUser";
const ReplieToTweet = ({ user, docId }) => {
  const { activeUser } = useCurrentUser();
  const config = genConfig(AvatarConfig);
  const inputFile = useRef("");
  const [tweet, setTweet] = useState("");
  let filePath = null;
  let url = null;
  const [file, setFile] = useState();
  const type = ["image/jpeg", "image/png"];
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  const changeHandler = (e) => {
    const selected = e.target.files[0];
    if (selected && type.includes(selected.type)) {
      setFile(selected);
    }
  };

  const uploadImage = async () => {
    filePath = `comments/${activeUser.userId}/${file.name}`;
    const storageRef = storage.ref(filePath);
    try {
      const res = await storageRef.put(file);
      url = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={(e)=> e.preventDefault()} className="whatshappening">
      <Avatar
        style={{
          width: "3rem",
          height: "3rem",
          cursor: "pointer",
          flexShrink: "0",
        }}
        {...config}
      />
      <div className="newtweet">
        <span style={{ color: "var(--my-gray)" }}>
          Replying to
          <span style={{ color: "rgb(29, 155, 240)" }}> @{user}</span>
        </span>
        <input
          type="text"
          name="newtweet"
          id="newtweet"
          placeholder="Tweet your reply"
          className="newtweet_input"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        />
        <div className="newtweet_options">
          <div className="icons">
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={changeHandler}
            />
            <img
              src={mediaIcon}
              alt="media icon"
              title="Media"
              onClick={onButtonClick}
            />
            <img src={gifIcon} alt="gif icon" title="GIF" />
            <img src={emojiIcon} alt="emoji icon" title="Emoji" />
          </div>
          {tweet.length > 0 ? (
            <button
              className="newtweet_button"
              onClick={async () => {
                if (tweet.length > 0) {
                  if (file) {
                    await uploadImage();
                  }
                  const newComment = {
                    userId: activeUser.userId,
                    username: activeUser.username,
                    imgUrl: url,
                    createdAt: Date.now(),
                    replies: [],
                    likes: [],
                    filePath,
                    tweet,
                    fullName: activeUser.fullName,
                    id: Math.floor(Math.random() * 1000000000000000000)
                  };
                  await database
                    .collection("tweets")
                    .doc(docId)
                    .update({
                      comments: FieldValue.arrayUnion(
                        newComment
                      ),
                    });
                    setTweet('')
                }
              }}
            >
              Tweet
            </button>
          ) : (
            <button
              disabled
              style={{
                opacity: ".6",
                cursor: "default",
                background: "#1a8cd8",
              }}
              className="newtweet_button"
            >
              Reply
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ReplieToTweet;
