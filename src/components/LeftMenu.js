import "./LeftMenu.css";
import { useContext } from "react";
import DeleteModelContext from "../context/DeleteModelContext";
import LMElement from "./LMElement";
import bookmarksIcon from "../assets/bookmarks.svg";
import exploreIcon from "../assets/explore.svg";
import homeIcon from "../assets/home.svg";
import listsIcon from "../assets/lists.svg";
import messagesIcon from "../assets/messages.svg";
import moreIcon from "../assets/more_circle.svg";
import notificationsIcon from "../assets/notifications.svg";
import profileIcon from "../assets/profile.svg";
import twitterIcon from "../assets/twitter.svg";
import AddTweetModel from "./AddTweetModel";
import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import User from "./User";

const LeftMenu = () => {
  const { activeUser } = useCurrentUser();
  const { tweetModel, setTweetModel } = useContext(DeleteModelContext);
  return (
    <>
      <AddTweetModel tweetModel={tweetModel} />
      <aside className="leftsection">
        <div className="upper_section">
          <img className="twitter_logo" src={twitterIcon} alt="twitter logo" />
          <Link to="/home">
            <LMElement icon={homeIcon} title="Home" active />
          </Link>
          <Link to="/connect_people">
            <LMElement icon={exploreIcon} title="Explore" />
          </Link>
          <Link to="/notfications">
            <LMElement icon={notificationsIcon} title="Notifications" />
          </Link>
          <LMElement icon={messagesIcon} title="Messages" />
          <LMElement icon={bookmarksIcon} title="Bookmarks" />
          <LMElement icon={listsIcon} title="Lists" />

          {activeUser ? (
            <Link to={`/profile/${activeUser.username}`}>
              <LMElement icon={profileIcon} title="Profile" />
            </Link>
          ) : (
            <div>
              <LMElement icon={profileIcon} title="Profile" />
            </div>
          )}

          <LMElement icon={moreIcon} title="More" />
          <button
            className="tweet_button"
            onClick={() => {
              setTweetModel(true);
            }}
          >
            <span className="rm_tweet">Tweet</span>
          </button>
          <div>
            <User />
          </div>
        </div>
        {/* <div className='bottom_section'>
        <Avatar style={{ width: '2.5rem', height: '2.5rem' }} {...config} />

      </div> */}
      </aside>
    </>
  );
};

export default LeftMenu;
