import { useEffect, useState } from "react";
import { database } from "../library/firebase";
import FollowCard from "./FollowCard";
import { Link } from "react-router-dom";
import { getFollowingOrFollowers } from "../services/firebase";
import "./ProfileTabs.css";
const FollowersTab = ({ user }) => {
  const [followers, setFollowers] = useState(null);

  useEffect(() => {
    async function getUserFollowers() {
      const followers = await getFollowingOrFollowers(user.followers);
      setFollowers(followers);
    }
    const unsub = database.collection("users").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          getUserFollowers();
        }
        if (change.type === "removed") {
          getUserFollowers();
        }
        if (change.type === "modified") {
          getUserFollowers();
        }
      });
    });

    return () => unsub();
  }, [user]);

  return (
    <>
      <div className="tab followers_tab">
        <button className="tablinks active" id="defaultOpen">
          Followers
        </button>
        <button>
          <Link to={`/profile/${user.username}/following`}>Following</Link>
        </button>
      </div>

      <div id="London" className="tabcontent active-tab">
        {followers &&
          followers.map((profile) => (
            <FollowCard
              key={profile.userId}
              fullName={profile.fullName}
              username={profile.username}
              id={profile.userId}
              docId={profile.docId}
              profilePic={profile.profilePic}
            />
          ))}
      </div>

      <div id="Paris" className="tabcontent"></div>
    </>
  );
};

export default FollowersTab;
