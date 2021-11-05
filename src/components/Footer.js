import "./Footer.css";
import Navigation from "./Navigation";
import exploreIcon from "../assets/explore.svg";
import homeIcon from "../assets/home.svg";
import notificationsIcon from "../assets/notifications.svg";
import profileIcon from "../assets/profile.svg";
import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import { useContext } from "react";
import DeleteModelContext from "../context/DeleteModelContext";
const Footer = () => {
  const { setTweetModel } = useContext(DeleteModelContext);
  const { activeUser } = useCurrentUser();
  return (
    <>
      <footer>
        <Link to="/home">
          <Navigation icon={homeIcon} />
        </Link>
        <Link to="/connect_people">
          <Navigation icon={exploreIcon} />
        </Link>
        <Link to="/notfications">
          <Navigation icon={notificationsIcon} />
        </Link>
        {activeUser ? (
          <Link to={`/profile/${activeUser.username}`}>
            <Navigation icon={profileIcon} />
          </Link>
        ) : (
          <div>
            <Navigation icon={profileIcon} />
          </div>
        )}
      </footer>
      <div
        className="floating_tweet_btn"
        onClick={() => {
          setTweetModel(true);
        }}
      >
        <i class="las la-plus"></i>
      </div>
    </>
  );
};

export default Footer;
