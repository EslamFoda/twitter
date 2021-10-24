import './WhatsHappening.css';

import Avatar, { AvatarConfig, genConfig } from 'react-nice-avatar';

import emojiIcon from '../assets/emoji.svg';
import gifIcon from '../assets/gif.svg';
import mediaIcon from '../assets/media.svg';
import pollIcon from '../assets/poll.svg';
import scheduleIcon from '../assets/schedule.svg';

const WhatsHappening = () => {
  const config = genConfig(AvatarConfig);

  return (
    <div className='whatshappening'>
      <Avatar
        style={{
          width: '3rem',
          height: '3rem',
          cursor: 'pointer',
          flexShrink: '0',
        }}
        {...config}
      />
      <div className='newtweet'>
        <input
          type='text'
          name='newtweet'
          id='newtweet'
          placeholder="What's happening?"
          className='newtweet_input'
        />
        <div className='newtweet_options'>
          <div className='icons'>
            <img src={mediaIcon} alt='media icon' title='Media' />
            <img src={gifIcon} alt='gif icon' title='GIF' />
            <img src={pollIcon} alt='poll icon' title='Poll' />
            <img src={emojiIcon} alt='emoji icon' title='Emoji' />
            <img src={scheduleIcon} alt='schedule icon' title='Schedule' />
          </div>
          <button className='newtweet_button'>Tweet</button>
        </div>
      </div>
    </div>
  );
};

export default WhatsHappening;
