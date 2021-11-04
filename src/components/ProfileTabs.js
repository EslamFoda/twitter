import { useState } from "react";
import { useEffect } from "react";
import { database } from "../library/firebase";
import { getTweetsWithComments } from "../services/firebase";
import "./ProfileTabs.css";
import Tweet from "./Tweet";
import ProfileTweets from "./ProfileTweets";
import ProfileReplies from "./ProfileReplies";
const ProfileTabs = ({ username }) => {
  const [tweets, setTweets] = useState(null);
  const [replies, setReplies] = useState(null);
  const [likedTweets, setLikedTweets] = useState(null);
  const [tweetsWithMedia, setTweetsWithMedia] = useState(null);
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

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = database
      .collection("users")
      .where("username", "==", username)
      .onSnapshot((snap) => {
        snap.docs.forEach((user) => {
          setUser(user.data());
        });
      });

    return () => unsub();
  }, [username]);

  useEffect(() => {
    async function getTweets() {
      let filteredTweets;
      let replies;
      const tweetsWithComments = await getTweetsWithComments();
      filteredTweets = tweetsWithComments.filter((document) => {
        return document.comments.length > 0;
      });
      if (user) {
        replies = filteredTweets.filter((d) =>
          d.comments.some((comment) => comment.userId === user.userId)
        );
        setReplies(replies);
      }
    }
    const unsub = database.collection("tweets").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          getTweets();
        }
        if (change.type === "removed") {
          getTweets();
        }
        if (change.type === "modified") {
          getTweets();
        }
      });
    });

    return () => unsub();
  }, [user]);

  useEffect(() => {
    const unsub = database.collection("tweets");
    if (user) {
      unsub.where("likes", "array-contains", user.userId).onSnapshot((snap) => {
        let result = [];
        snap.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setLikedTweets(result);
      });
    }
  }, [user]);

  useEffect(() => {
    let tweetsWithPhotos;
    const unsub = database
      .collection("tweets")
      .where("username", "==", username)
      .onSnapshot((snap) => {
        const result = [];
        snap.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        tweetsWithPhotos = result.filter((tweet) => {
          return tweet.imgUrl;
        });
        setTweetsWithMedia(tweetsWithPhotos);
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
            <div
              key={tweet.id}
              style={{ borderBottom: "1px solid var(--blue-gray-light)" }}
            >
              <Tweet
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
                profilePic={tweet.profilePic}
              />
            </div>
          ))}
        {tweets && tweets.length === 0 && (
          <div className="no_replies">
            <h2>There is no tweets yet</h2>
          </div>
        )}
      </div>

      <div id="Paris" className="tabcontent">
        {replies &&
          replies.map((tweet, index) => (
            <div
              key={tweet.id}
              className="colmn-container"
              style={{ borderBottom: "1px solid var(--blue-gray-light)" }}
            >
              <div className="colmn"></div>
              <ProfileTweets
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
                profilePic={tweet.profilePic}
              />
              {replies &&
                tweet &&
                tweet.comments.map((comment, index) => {
                  return (
                    <ProfileReplies
                      index={index}
                      key={index}
                      docId={tweet.id}
                      name={comment.fullName}
                      user={comment.username}
                      date={comment.createdAt}
                      text={comment.tweet}
                      verified={true}
                      image={comment.imgUrl}
                      replies={comment.replies.length}
                      retweets={comment.retweets}
                      likes={comment.likes.length}
                      likesArray={comment.likes}
                      commentsArray={tweet.comments}
                      commentId={comment.id}
                      filePath={comment.filePath}
                      reply={tweet.username}
                      profilePic={comment.profilePic}
                    />
                  );
                })}
            </div>
          ))}
        {replies && replies.length === 0 && (
          <div className="no_replies">
            <h2>There is no replies yet</h2>
          </div>
        )}
      </div>

      <div id="Tokyo" className="tabcontent">
        {tweetsWithMedia &&
          tweetsWithMedia.map((tweet, index) => (
            <div
              key={index}
              style={{ borderBottom: "1px solid var(--blue-gray-light)" }}
            >
              <Tweet
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
                profilePic={tweet.profilePic}
              />
            </div>
          ))}
        {tweetsWithMedia && tweetsWithMedia.length === 0 && (
          <div className="no_replies">
            <h2>This user didnt Tweeted any photos yet</h2>
            <p style={{ color: "rgb(136, 153, 166)", fontSize: "smaller" }}>
              When you send Tweets with photos or videos in them, it will show
              up here.
            </p>
          </div>
        )}
      </div>
      <div id="Likes" className="tabcontent">
        {likedTweets &&
          likedTweets.map((tweet, index) => (
            <div
              key={index}
              style={{ borderBottom: "1px solid var(--blue-gray-light)" }}
            >
              <Tweet
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
                profilePic={tweet.profilePic}
              />
            </div>
          ))}
        {likedTweets && likedTweets.length === 0 && (
          <div className="no_replies">
            <h2>There is no Likes yet</h2>
            <p style={{ color: "rgb(136, 153, 166)", fontSize: "smaller" }}>
              Tap the heart on any Tweet to show it some love. When you do,
              it’ll show up here.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileTabs;
