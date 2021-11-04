import { useEffect, useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { database } from "../library/firebase";
import CommentsNotfication from "./CommentsNotfication";
import LikesNotifications from "./LikesNotifications";
const NotifyTabs = () => {
  const { activeUser } = useCurrentUser();
  const [comments, setComments] = useState(null);
  const [likes,setLikes] = useState(null)
  function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  useEffect(() => {
    if (activeUser) {
      database
        .collection("notifications")
        .where("username", "==", activeUser.username)
        .onSnapshot((snap) => {
          const result = [];
          snap.docs.forEach((doc) => {
            result.push({ ...doc.data(), docId: doc.id });
          });
          setComments(result);
        });
    }
  }, [activeUser]);

  useEffect(()=>{
 if (activeUser) {
   database
     .collection("likes")
     .where("username", "==", activeUser.username)
     .onSnapshot((snap) => {
       const result = [];
       snap.docs.forEach((doc) => {
         result.push({ ...doc.data(), docId: doc.id });
       });
      
       setLikes(result);
     });
 }
  },[activeUser])
  return (
    <>
      <div className="tab followers_tab active">
        <button
          className="tablinks active"
          onClick={(e) => {
            openCity(e, "London");
          }}
          id="defaultOpen"
        >
          Comments
        </button>
        <button
          className="tablinks"
          onClick={(e) => {
            openCity(e, "Paris");
          }}
        >
          Likes
        </button>
      </div>
      <div id="London" className="tabcontent active-tab">
        {comments &&
          comments.map((comment) => (
            <CommentsNotfication
              key={comment.docId}
              from={comment.from}
              fullName={comment.fullName}
              notfication={comment.msg}
              date={comment.createdAt}
              profilePic={comment.profilePic}
              tweetId={comment.tweetId}
              username={comment.username}
              image={comment.imgUrl}
              text={comment.comment}
            />
          ))}
      </div>
      <div id="Paris" className="tabcontent">
        {likes &&
          likes.map((like) => (
            <LikesNotifications
              key={like.docId}
              from={like.from}
              fullName={like.fullName}
              date={like.createdAt}
              profilePic={like.profilePic}
              tweetId={like.tweetId}
              username={like.username}
              image={like.imgUrl}
              tweetDetails={like.tweetDetails}
            />
          ))}
      </div>
    </>
  );
};

export default NotifyTabs;
