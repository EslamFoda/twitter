import { useState } from "react";
import { useEffect } from "react";
import { database } from "../library/firebase";
import "./ProfileTabs.css";
import Tweet from "./Tweet";
const ProfileTabs = ({ username }) => {
    const [tweets,setTweets] = useState(null)
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
    const unsub = database
      .collection("tweets")
      .where("username", "==", username)
      .onSnapshot((snap) => {
        let results = [];
        snap.docs.forEach((tweet) => {
          results.push({ ...tweet.data(), id: tweet.id });
        });
        setTweets(results);
      });

    return () => unsub();
  }, [username]);

  return (
    <>
      <div className="tab">
        <button
          className="tablinks active"
          onClick={(e) => {
            openCity(e, "London");
          }}
          id="defaultOpen"
        >
          Tweets
        </button>
        <button
          className="tablinks"
          onClick={(e) => {
            openCity(e, "Paris");
          }}
        >
          Tweets & replies
        </button>
        <button
          className="tablinks"
          onClick={(e) => {
            openCity(e, "Tokyo");
          }}
        >
          Media
        </button>
        <button
          className="tablinks"
          onClick={(e) => {
            openCity(e, "Likes");
          }}
        >
          Likes
        </button>
      </div>

      <div id="London" className="tabcontent active-tab">
        {tweets &&
          tweets.map((tweet) => (
            <div style={{ borderBottom: "1px solid var(--blue-gray-light)" }}>
              <Tweet
                key={tweet.id}
                docId={tweet.id}
                name={tweet.fullName}
                user={tweet.username}
                date={tweet.createdAt}
                text={tweet.tweet}
                verified={true}
                image={tweet.imgUrl}
                replies={tweet.comments.length}
                retweets={tweet.retweets}
                likes={tweet.likes.length}
                likesArray={tweet.likes}
                userId={tweet.userId}
                filePath={tweet.filePath}
                tweet={tweet}
              />
            </div>
          ))}
      </div>

      <div id="Paris" className="tabcontent">
        <h3>Paris</h3>
        <p>Paris is the capital of France.</p>
      </div>

      <div id="Tokyo" className="tabcontent">
        <h3>Tokyo</h3>
        <p>Tokyo is the capital of Japan.</p>
      </div>
      <div id="Likes" className="tabcontent">
        <h3>Likes</h3>
        <p>bla bla bla</p>
      </div>
    </>
  );
};

export default ProfileTabs;
