import './MainSection.css';
import { database } from '../library/firebase';
import Tweet from './Tweet';
import WhatsHappening from './WhatsHappening';
import topTweetsIcon from '../assets/stars.svg';
import { useEffect, useState } from 'react';


const MainSection = () => {
  const [tweets, setTweets] = useState(null);
  useEffect(()=>{
    const unsub = database.collection('tweets').orderBy('createdAt','desc').onSnapshot(snap=>{
      let result = []
      snap.docs.forEach(doc=>{
        result.push({...doc.data(),id:doc.id})
      })
      setTweets(result);
    })
    return ()=> unsub()
  },[])
  const posts = [
    {
      id: 1,
      name: 'Omar AbdulRahman',
      verified: true,
      user: 'Omar45',
      date: '11m',
      text: 'Tell me what do you think about this twitter clone!',
      replies: 3,
      retweets: 5,
      likes: 10,
    },
    {
      id: 2,
      name: 'One Perfect Shot',
      user: 'OnePerfectShot',
      date: '7h',
      text: 'THERE WILL BE BLOOD (2007)\n\nCinematography by Robert Elswit\nDirected by Paul Thomas Anderson',
      replies: 42,
      retweets: 124,
      likes: 654,
      verified: true,
      image:
        'https://res.cloudinary.com/omar45/image/upload/c_thumb,h_544,w_1000/v1630429696/there.jpg',
    },
    {
      id: 3,
      name: 'Yasmin Saber',
      user: 'YasminSaber20',
      date: '30m',
      text: 'The fact that 77 is a divisor of 1001 disturbs me...',
      replies: 2,
      retweets: 1,
      likes: 3,
    },
    {
      id: 4,
      name: 'Omar AbdulRahman',
      user: 'Omar45',
      verified: true,
      date: '7h',
      text: 'I also have a YouTube channel!\nYouTube.com/OmarAbdulRahman45',
      image:
        'https://res.cloudinary.com/omar45/image/upload/c_thumb,h_544,w_1000/v1630503631/youtube.png',
      replies: 9,
      retweets: 14,
      likes: 69,
    },
    {
      id: 5,
      name: 'Yousra Shafik',
      user: 'YousraSh',
      date: '1d',
      text: '“It is difficult to find happiness within oneself,\nbut it is impossible to find it anywhere else.”\n\n~Arthur Schopenhauer',
      replies: 12,
      retweets: 20,
      likes: 30,
    },
    {
      id: 5,
      name: 'Mohamed Hassan',
      user: 'MoHassan33',
      date: '2d',
      text: `Just finished "There will be blood" movie.\nWhat a masterpiece!`,
      replies: 1,
      retweets: 2,
      likes: 12,
    },
  ];

  return (
    <div className="mainsection">
      <div className="home_topbar">
        Home
        <img src={topTweetsIcon} alt="Top Tweets" className="toptweets" />
      </div>
      <WhatsHappening />
      {tweets &&
        tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            name={tweet.fullName}
            user={tweet.username}
            date={tweet.createdAt}
            text={tweet.tweet}
            verified={true}
            image={tweet.imgUrl}
            replies={tweet.comments.length}
            retweets={tweet.retweets}
            likes={tweet.likes.length}
          />
        ))}
    </div>
  );
};

export default MainSection;
