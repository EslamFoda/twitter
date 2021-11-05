import "./MainSection.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import SelectedTweet from "./SelectedTweet";
import { database } from "../library/firebase";
import { useParams } from "react-router-dom";
import ReplieToTweet from "./ReplieToTweet";
import TweetComment from "./TweetComment";
import Spinner from "./Spinner";
const Status = () => {
  const params = useParams();
  const [tweet, setTweet] = useState();
  const history = useHistory();
  const [comments, setComments] = useState(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    setErr('')
    const unsub = database
      .collection("tweets")
      .doc(params.id)
      .onSnapshot((snap) => {
        if (snap.data()) {
          setTweet({ ...snap.data(), id: snap.id });
          setComments(snap.data().comments.reverse());
        } else {
          setErr(" this tweet has been removed.");
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
          <i
            className="las la-arrow-left back-btn"
            onClick={() => {
              history.goBack();
            }}
          ></i>

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
            profilePic={tweet.profilePic}
          />
        )}
        {!tweet && !err && <Spinner></Spinner>}
        {err && <p style={{margin:'3rem',textAlign:'center',borderBottom:'none'}}>{err}</p>}
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
                reply={tweet.username}
                profilePic={comment.profilePic}
              />
            );
          })}
      </div>
    </>
  );
};

export default Status;
