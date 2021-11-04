import { useEffect, useState } from "react";
import { database } from "../library/firebase";
import FollowCard from "./FollowCard";
import { useHistory } from "react-router-dom";
import { getFollowingOrFollowers } from "../services/firebase";
import "./ProfileTabs.css";
import Spinner from "./Spinner";
const FollowersTab = ({ user }) => {
  const hisory = useHistory();
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
        <button
          onClick={() => hisory.push(`/profile/${user.username}/following`)}
        >
          Following
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
        {!followers && <Spinner></Spinner>}
      </div>

      <div id="Paris" className="tabcontent"></div>
    </>
  );
};

export default FollowersTab;
