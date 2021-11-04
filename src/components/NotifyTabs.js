import { useEffect, useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { database } from "../library/firebase";
import CommentsNotfication from "./CommentsNotfication";
const NotifyTabs = () => {
  const { activeUser } = useCurrentUser();
  const [comments,setComments] = useState(null)
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
            console.log(doc.data());
          });
          setComments(result);
          console.log(result);
        });
    }
  }, [activeUser]);
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
              createdAt={comment.createdAt}
              profilePic={comment.profilePic}
              tweetId={comment.tweetId}
              username={comment.username}
            />
          ))}
      </div>
      <div id="Paris" className="tabcontent">
        <h1>paris</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </>
  );
};

export default NotifyTabs;
