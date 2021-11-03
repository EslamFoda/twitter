import { useEffect, useState } from "react";
import { database } from "../library/firebase";
import "./ProfileTabs.css";
import FollowCard from "./FollowCard";
import { Link } from "react-router-dom";
import { getFollowingOrFollowers } from "../services/firebase";
const FollowingTab = ({ user }) => {
  const [following, setFollowing] = useState(null);
  useEffect(() => {
    async function getUserFollowing() {
      const followers = await getFollowingOrFollowers(user.following);
      setFollowing(followers);
    }
    const unsub = database.collection("users").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          getUserFollowing();
        }
        if (change.type === "removed") {
          getUserFollowing();
        }
        if (change.type === "modified") {
          getUserFollowing();
        }
      });
    });

    return () => unsub();
  }, [user]);

  return (
    <>
      <div className="tab followers_tab">
        <button>
          <Link to={`/profile/${user.username}/followers`}>Followers</Link>
        </button>
        <button className="tablinks active" id="defaultOpen">
          Following
        </button>
      </div>

      <div id="London" className="tabcontent"></div>

      <div id="Paris" className="tabcontent active-tab">
        {following &&
          following.map((profile) => (
            <FollowCard
              key={profile.userId}
              fullName={profile.fullName}
              username={profile.username}
              id={profile.userId}
              docId={profile.docId}
              profilePic={profile.profilePic}
            />
          ))}
        {}
      </div>
    </>
  );
};

export default FollowingTab;
