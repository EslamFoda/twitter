import "./FollowCard.css";
import Avatar, { AvatarConfig, genConfig } from "react-nice-avatar";
import { Link } from "react-router-dom";
const Following = ({ fullName, username, id, docId }) => {
  const config = genConfig(AvatarConfig);

  return (
    <>
      <div className="follow_card">
        <Avatar style={{ width: "3rem", height: "3rem" }} {...config} />
        <div className="text">
          <Link to={`/profile/${username}`}>{fullName}</Link>
          <p>@{username}</p>
        </div>
        <button>Follow</button>
      </div>
    </>
  );
};

export default Following;
