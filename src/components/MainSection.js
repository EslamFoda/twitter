import "./MainSection.css";
import Tweet from "./Tweet";
import WhatsHappening from "./WhatsHappening";
import topTweetsIcon from "../assets/stars.svg";
import { useEffect, useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { database } from "../library/firebase";
import { getLoggedInUserTweets } from "../services/firebase";
import { getFollowingUsersTweets } from "../services/firebase";
const MainSection = () => {
  const { activeUser } = useCurrentUser();
  const [tweets, setTweets] = useState([]);
  

  useEffect(() => {
   
    async function getTweets() {
      
      if (activeUser) {
        const userTweets = await getLoggedInUserTweets(activeUser.userId);
        const followingTweets = await getFollowingUsersTweets(activeUser.following);
        const allTweets = [...userTweets,...followingTweets]
        setTweets(allTweets);
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
         if(change.type === 'modified'){
           getTweets();
         }
       });
     });

     return () => unsub()
  }, [activeUser]);

  

  return (
    <div className="mainsection">
      <div className="home_topbar">
        Home
        <img src={topTweetsIcon} alt="Top Tweets" className="toptweets" />
      </div>
      <WhatsHappening />
      {tweets && 
        tweets.map((tweet) => (
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
          />
        ))}
    </div>
  );
};

export default MainSection;
