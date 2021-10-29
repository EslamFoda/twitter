import "./MainSection.css";
import { useEffect, useState } from "react";
import SelectedTweet from "./SelectedTweet";
import { database } from "../library/firebase";
import { useParams } from "react-router-dom";
import ReplieToTweet from "./ReplieToTweet";
import TweetComment from "./TweetComment";
const Status = () => {
  const params = useParams();
  const [tweet, setTweet] = useState();

  useEffect(() => {
    const unsub = database
      .collection("tweets")
      .doc(params.id)
      .onSnapshot((snap) => {
        setTweet({ ...snap.data(), id: snap.id });
      });
    return () => unsub();
  }, [params.id]);

  return (
    <div className="mainsection">
      <div
        className="home_topbar"
        style={{
          position: "sticky",
          top: "0",
          left: "0",
          zIndex: "20",
          background: "rgb(21, 32, 43)",
        }}
      >
        Tweet
      </div>
      {tweet && (
        <SelectedTweet
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
        />
      )}
      {tweet && <ReplieToTweet user={tweet.username} docId={tweet.id} />}
      {tweet &&
        tweet.comments.reverse().map((comment, index) => {
         return (
           <TweetComment
             index={index}
             key={index}
             docId={params.id}
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
             commentsArray = {tweet.comments}
             commentId={comment.id}
           />
         );
        })}
    </div>
  );
};

export default Status;
