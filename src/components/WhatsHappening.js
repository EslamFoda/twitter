import "./WhatsHappening.css";
import { useRef, useState } from "react";
import Avatar, { AvatarConfig, genConfig } from "react-nice-avatar";

import emojiIcon from "../assets/emoji.svg";
import gifIcon from "../assets/gif.svg";
import mediaIcon from "../assets/media.svg";
import pollIcon from "../assets/poll.svg";
import scheduleIcon from "../assets/schedule.svg";
import { database, storage } from "../library/firebase";
import useCurrentUser from "../hooks/useCurrentUser";
const WhatsHappening = () => {
  const { activeUser } = useCurrentUser();
  const config = genConfig(AvatarConfig);
  const inputFile = useRef("");
  const [tweet, setTweet] = useState("");
  let filePath = null;
  let url = null;
  const [file, setFile] = useState();
  const [viewImage, setViewImage] = useState("");
  const type = ["image/jpeg", "image/png"];
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  const changeHandler = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setViewImage(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
    const selected = e.target.files[0];
    if (selected && type.includes(selected.type)) {
      setFile(selected);
    }
  };

  const uploadImage = async () => {
    filePath = `tweet/${activeUser.userId}/${file.name}`;
    const storageRef = storage.ref(filePath);
    try {
      const res = await storageRef.put(file);
      url = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteImageViewer = ()=>{
    setFile(null)
    setViewImage('')
  }


  return (
    <div className="whatshappening">
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
        <input
          type="text"
          name="newtweet"
          id="newtweet"
          placeholder="What's happening?"
          className="newtweet_input"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        />
        {viewImage && (
          <div className="image_viewer_container">
            <i
              class="las la-times del_image_viewer_btn"
              onClick={handleDeleteImageViewer}
            ></i>
            <img src={viewImage} alt="" />
          </div>
        )}
        {viewImage && (
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "var(--blue-gray-light)",
              marginTop: "2rem",
            }}
          ></div>
        )}
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
            <img src={pollIcon} alt="poll icon" title="Poll" />
            <img src={emojiIcon} alt="emoji icon" title="Emoji" />
            <img src={scheduleIcon} alt="schedule icon" title="Schedule" />
          </div>
          {tweet.length > 0 ? (
            <button
              className="newtweet_button"
              onClick={async () => {
                if (tweet.length > 0) {
                  if (file) {
                    await uploadImage();
                  }
                  await database.collection("tweets").add({
                    userId: activeUser.userId,
                    username: activeUser.username,
                    imgUrl: url,
                    createdAt: Date.now(),
                    comments: [],
                    likes: [],
                    filePath,
                    tweet,
                    fullName: activeUser.fullName,
                  });
                }
                setTweet("");
                setFile(null);
                setViewImage("");
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
              Tweet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsHappening;
