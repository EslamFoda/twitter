import './WhoToFollow.css';

import FollowCard from './FollowCard';

const WhoToFollow = () => {
  return (
    <div className='who_to_follow'>
      <h3>Who to follow</h3>
      <FollowCard />
      <FollowCard name='Shehab Ihab' user='Shehab910' />
      <p>Show more</p>
    </div>
  );
};

export default WhoToFollow;
