import "./MainSection.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SelectedTweet from "./SelectedTweet";
import { database } from "../library/firebase";
import { useParams } from "react-router-dom";
import ReplieToTweet from "./ReplieToTweet";
import TweetComment from "./TweetComment";

const Status = () => {
  const params = useParams();
  const [tweet, setTweet] = useState();
  const [comments,setComments] = useState(null)
  const [err,setErr] = useState('')
  useEffect(() => {
    const unsub = database
      .collection("tweets")
      .doc(params.id)
      .onSnapshot((snap) => {
        if(snap.data()){
          setTweet({ ...snap.data(), id: snap.id });
          setComments(snap.data().comments.reverse());
        }else {
          setErr(
            " Hmm...this page doesn’t exist. Try searching for something else."
          );
        }
      });
    return () => unsub();
  }, [params.id]);

  return (
    <>
      <div className="mainsection">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "sticky",
            top: "0",
            left: "0",
            zIndex: "20",
            background: "rgb(21, 32, 43)",
          }}
        >
          <Link to="/home">
            <i className="las la-arrow-left back-btn"></i>
          </Link>
          <div className="home_topbar">Tweet</div>
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
            filePath={tweet.filePath}
            err={err}
            tweet={tweet}
          />
        )}
        {tweet && <ReplieToTweet user={tweet.username} docId={tweet.id} />}
        {tweet &&
          comments &&
          comments.map((comment, index) => {
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
                commentsArray={tweet.comments}
                comments={comments}
                commentId={comment.id}
                filePath={comment.filePath}
              />
            );
          })}
      </div>
    </>
  );
};

export default Status;
