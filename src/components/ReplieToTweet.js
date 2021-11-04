import "./WhatsHappening.css";
import { useRef, useState, useContext } from "react";

import DeleteModelContext from "../context/DeleteModelContext";
import emojiIcon from "../assets/emoji.svg";
import gifIcon from "../assets/gif.svg";
import mediaIcon from "../assets/media.svg";
import { database, storage, FieldValue } from "../library/firebase";
import useCurrentUser from "../hooks/useCurrentUser";
import { useHistory } from "react-router-dom";
const ReplieToTweet = ({ user, docId, username, id }) => {
  const { activeUser } = useCurrentUser();
  const history = useHistory();

  const inputFile = useRef("");
  const [tweet, setTweet] = useState("");
  let filePath = null;
  let url = null;
  const [file, setFile] = useState();
  const [viewImage, setViewImage] = useState("");
  const { setCommentModel } = useContext(DeleteModelContext);
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
    filePath = `comments/${activeUser.userId}/${file.name}`;
    const storageRef = storage.ref(filePath);
    try {
      const res = await storageRef.put(file);
      url = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteImageViewer = () => {
    setFile(null);
    setViewImage("");
  };

  const addComment = async (documentId) => {
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
        id: Math.floor(Math.random() * 1000000000000000000),
        profilePic: activeUser.profilePic,
      };
      await database
        .collection("tweets")
        .doc(documentId)
        .update({
          comments: FieldValue.arrayUnion(newComment),
        });
      setTweet("");
      setFile(null);
      setViewImage("");

    await database.collection("notifications").add({
      from: activeUser.username,
      profilePic: activeUser.profilePic,
      msg: `${activeUser.username} commented on your tweet`,
      createdAt: Date.now(),
      username: user,
      fullName: activeUser.fullName,
      tweetId: docId
    });
    }
  };

  const addCommentFromModel = async (modelId) => {
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
        id: Math.floor(Math.random() * 1000000000000000000),
        profilePic: activeUser.profilePic,
      };
      await database
        .collection("tweets")
        .doc(modelId)
        .update({
          comments: FieldValue.arrayUnion(newComment),
        });
      setTweet("");
      setFile(null);
      setViewImage("");
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} className="whatshappening">
      {activeUser && (
        <div className="avatar_container" style={{ marginRight: "0" }}>
          <img src={activeUser.profilePic} alt="" />
        </div>
      )}
      <div className="newtweet">
        <span style={{ color: "var(--my-gray)" }}>
          Replying to
          {user && <span style={{ color: "rgb(29, 155, 240)" }}> @{user}</span>}
          {username && (
            <span style={{ color: "rgb(29, 155, 240)" }}> @{username}</span>
          )}
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
        {viewImage && (
          <div className="image_viewer_container">
            <i
              className="las la-times del_image_viewer_btn"
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
            <img src={emojiIcon} alt="emoji icon" title="Emoji" />
          </div>
          {tweet.length > 0 ? (
            <button
              className="newtweet_button"
              onClick={() => {
                if (docId) {
                  addComment(docId);
                } else {
                  addCommentFromModel(id);
                  history.push(`/tweet/${username}/${id}`);
                  setCommentModel(false);
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
