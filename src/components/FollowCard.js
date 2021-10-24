import './FollowCard.css';

import Avatar, { AvatarConfig, genConfig } from 'react-nice-avatar';

const FollowCard = ({ name = 'Ahmed Tawfik', user = 'V01dC0d3' }) => {
  const config = genConfig(AvatarConfig);

  return (
    <div className='follow_card'>
      <Avatar style={{ width: '3rem', height: '3rem' }} {...config} />
      <div className='text'>
        <h4>{name}</h4>
        <p>@{user}</p>
      </div>
      <button>Follow</button>
    </div>
  );
};

export default FollowCard;
