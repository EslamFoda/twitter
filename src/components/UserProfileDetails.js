import { useEffect, useRef } from "react";
import "./UserProfileDetails.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import { formatDistance } from "date-fns";
import { database, FieldValue } from "../library/firebase";

const UserProfileDetails = ({ username }) => {
  const [editModel, setEditModel] = useState(false);
  const { activeUser } = useCurrentUser();
  const backgroundInput = useRef("");
  const profileImageInput = useRef("");
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const type = ["image/jpeg", "image/png"];
  const [proifleImage, setProfileImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    backgroundInput.current.click();
  };
  const onSecButtonClick = () => {
    // `current` points to the mounted file input element
    profileImageInput.current.click();
  };
  const secChangeHandler = (e) => {
    const selected = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (selected && type.includes(selected.type)){
        setProfileImage(reader.result);
        profileImageInput.current.value = ''
      }
    });

    reader.readAsDataURL(e.target.files[0]);
  };

  const changeHandler = (e) => {
    const selected = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
       if (selected && type.includes(selected.type)){
         setBackgroundImage(reader.result);
         backgroundInput.current.value = ''
       }
    });

    reader.readAsDataURL(e.target.files[0]);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (user) {
      database.collection("users").doc(user.docId).update({
        fullName: name,
        bio: bio,
        backgroundImage,
        profilePic: proifleImage,
        location: location,
      });
      const ORDER_ITEMS = database.collection("tweets");
      ORDER_ITEMS.where("userId", "==", user.userId)
        .get()
        .then((snapshots) => {
          console.log(snapshots.size);
          if (snapshots.size > 0) {
            snapshots.forEach((orderItem) => {
              ORDER_ITEMS.doc(orderItem.id).update({
                fullName: name,
                profilePic: proifleImage,
              });
            });
          }
        });
      setEditModel(false);
    }
  };
  useEffect(() => {
    const unsub = database
      .collection("users")
      .where("username", "==", username)
      .onSnapshot((snap) => {
        snap.docs.forEach((user) => {
          setUser({ ...user.data(), docId: user.id });
        });
      });
    return () => unsub();
  }, [username]);

  return (
    <>
      {user && editModel && (
        <div className="edit-model-overlay">
          <div className="edit_container">
            <div className="addtweet_model_header edit_header">
              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  className="las la-times close_addmodel_btn"
                  onClick={() => {
                    setEditModel(false);
                  }}
                ></i>
                <h3 style={{ marginTop: "-.2rem", marginLeft: "1.5rem" }}>
                  Edit profile
                </h3>
              </div>
              <button className="profile_follow_btn" onClick={handleSave}>
                Save
              </button>
            </div>
            <div className="edit_backgroundimage">
              <img src={user.backgroundImage} alt="" />
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                ref={backgroundInput}
                onChange={changeHandler}
              />
              <i
                className="las la-camera camera_btn"
                onClick={onButtonClick}
              ></i>
            </div>
            <div className="edit_body">
              <div className="edit_img_container">
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  ref={profileImageInput}
                  onChange={secChangeHandler}
                />
                <img src={user.profilePic} alt="" />
                <i
                  className="las la-camera camera_btn"
                  onClick={onSecButtonClick}
                ></i>
              </div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
      {user && (
        <div>
          <div className="profile_background_img">
            <img src={user.backgroundImage} alt="" />
          </div>
          <div className="user_profile_container">
            <div className="profile_header">
              <div className="profile_pic_container">
                <img
                  src={user.profilePic}
                  alt={`${user.username} profile pic`}
                />
              </div>
              <div className="profile_btns_container">
                {activeUser && activeUser.userId === user.userId && (
                  <button
                    className="edit_btn"
                    onClick={() => {
                      setName(user.fullName);
                      setProfileImage(user.profilePic);
                      setBackgroundImage(user.backgroundImage);
                      setBio(user.bio);
                      setLocation(user.location);
                      setEditModel(true);
                    }}
                  >
                    Edit Profile
                  </button>
                )}
                {activeUser &&
                  user &&
                  activeUser.userId !== user.userId &&
                  !activeUser.following.includes(user.userId) && (
                    <button
                      className="profile_follow_btn"
                      onClick={() => {
                        database
                          .collection("users")
                          .doc(activeUser.docId)
                          .update({
                            following: FieldValue.arrayUnion(user.userId),
                          });
                        database
                          .collection("users")
                          .doc(user.docId)
                          .update({
                            followers: FieldValue.arrayUnion(activeUser.userId),
                          });
                      }}
                    >
                      Follow
                    </button>
                  )}
                {activeUser && activeUser.following.includes(user.userId) && (
                  <button
                    className="profile_follow_btn following_btn"
                    onClick={() => {
                      database
                        .collection("users")
                        .doc(activeUser.docId)
                        .update({
                          following: FieldValue.arrayRemove(user.userId),
                        });
                      database
                        .collection("users")
                        .doc(user.docId)
                        .update({
                          followers: FieldValue.arrayRemove(activeUser.userId),
                        });
                    }}
                  >
                    <span className="following_text">Following</span>
                    <span className="unfollow_text">UnFollow</span>
                  </button>
                )}
              </div>
            </div>
            <div className="user_details_container">
              {user.fullName.length > 30 ? (
                <h2>{user.fullName.substr(0, 30) + "..."}</h2>
              ) : (
                <h2>{user.fullName}</h2>
              )}
              <span style={{ color: "rgb(136, 153, 166)" }}>
                @{user.username}
              </span>
              {user.bio.length > 150 ? (
                <p style={{ margin: ".6rem 0" }} className="bio">
                  {user.bio.substr(0, 150) + "..."}
                </p>
              ) : (
                <p style={{ margin: ".6rem 0" }} className="bio">
                  {user.bio}
                </p>
              )}
              <div
                style={{
                  color: "rgb(136, 153, 166)",
                  display: "flex",
                  alignItems: "center",
                  margin: ".6rem 0",
                }}
              >
                {user && user.location && (
                  <div>
                    <i
                      className="las la-map-marker"
                      style={{ marginRight: ".3rem", fontSize: "1.2rem" }}
                    ></i>
                    <span style={{ marginRight: "1rem" }}>{user.location}</span>
                  </div>
                )}
                <i
                  className="las la-calendar"
                  style={{ marginRight: ".3rem", fontSize: "1.3rem" }}
                ></i>
                <span>
                  Joined {formatDistance(user.createdAt, new Date())} ago
                </span>
              </div>
              <div className="follower_following_container">
                <Link
                  className="followers__follwoings"
                  to={`/profile/${username}/following`}
                  style={{ marginRight: "1rem" }}
                >
                  <span>
                    {user.following.length}{" "}
                    <span style={{ color: "rgb(136, 153, 166)" }}>
                      Following
                    </span>
                  </span>
                </Link>
                <Link
                  className="followers__follwoings"
                  to={`/profile/${username}/followers`}
                >
                  <span>
                    {user.followers.length}{" "}
                    <span style={{ color: "rgb(136, 153, 166)" }}>
                      Followers
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileDetails;
