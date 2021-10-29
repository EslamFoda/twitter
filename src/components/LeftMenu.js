import './LeftMenu.css';

import LMElement from './LMElement';
import bookmarksIcon from '../assets/bookmarks.svg';
import exploreIcon from '../assets/explore.svg';
import homeIcon from '../assets/home.svg';
import listsIcon from '../assets/lists.svg';
import messagesIcon from '../assets/messages.svg';
import moreIcon from '../assets/more_circle.svg';
import notificationsIcon from '../assets/notifications.svg';
import profileIcon from '../assets/profile.svg';
import twitterIcon from '../assets/twitter.svg';

import User from './User';
const LeftMenu = () => {
  return (
    <aside className='leftsection'>
      <div className='upper_section'>
        <img className='twitter_logo' src={twitterIcon} alt='twitter logo' />
        <LMElement icon={homeIcon} title='Home' active />
        <LMElement icon={exploreIcon} title='Explore' />
        <LMElement icon={notificationsIcon} title='Notifications' />
        <LMElement icon={messagesIcon} title='Messages' />
        <LMElement icon={bookmarksIcon} title='Bookmarks' />
        <LMElement icon={listsIcon} title='Lists' />
        <LMElement icon={profileIcon} title='Profile' />
        <LMElement icon={moreIcon} title='More' />
        <button className='tweet_button' onClick={()=>{
          console.log('yes')
        }}>Tweet</button>
        <User/>
      </div>
      {/* <div className='bottom_section'>
        <Avatar style={{ width: '2.5rem', height: '2.5rem' }} {...config} />

      </div> */}
    </aside>
  );
};

export default LeftMenu;
