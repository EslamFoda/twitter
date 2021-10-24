import './Tweet.css';

import Avatar, { AvatarConfig, genConfig } from 'react-nice-avatar';

import likeIcon from '../assets/like.svg';
import repliesIcon from '../assets/replies.svg';
import retweetIcon from '../assets/retweet.svg';
import shareIcon from '../assets/share.svg';
import verifiedIcon from '../assets/verified.svg';

const Tweet = ({
  name,
  user,
  date,
  text,
  replies,
  retweets,
  likes,
  image,
  verified,
}) => {
  const config = genConfig(AvatarConfig);

  return (
    <div className='tweet'>
      <Avatar
        style={{
          width: '3rem',
          height: '3rem',
          marginRight: '1em',
          flexShrink: '0',
        }}
        {...config}
      />
      <div className='tweet_content'>
        <div className='tweet_header'>
          <span className='tweet_name'>{name}</span>
          {verified && (
            <img className='verified' src={verifiedIcon} alt='verified' />
          )}
          <span className='tweet_username'>@{user}</span>•
          <span className='tweet_date'>{date}</span>
        </div>
        <pre className='tweet_text'>{text}</pre>
        {image && <img className='tweet_image' src={image} alt={text} />}
        <div className='tweet_footer'>
          <div className='icon_wrapper'>
            <img className='footer_icon' src={repliesIcon} alt='replies' />{' '}
            <span>{replies}</span>
          </div>
          <div className='icon_wrapper'>
            <img className='footer_icon' src={retweetIcon} alt='retweets' />{' '}
            <span>{retweets}</span>
          </div>
          <div className='icon_wrapper'>
            <img className='footer_icon' src={likeIcon} alt='likes' />{' '}
            <span>{likes}</span>
          </div>
          <div className='icon_wrapper'>
            <img className='footer_icon' src={shareIcon} alt='share' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
