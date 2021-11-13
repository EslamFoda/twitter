import { useEffect, useState } from "react";
import { database } from "../library/firebase";
import "./ProfileTabs.css";
import FollowCard from "./FollowCard";
import { useHistory } from "react-router-dom";
import { getFollowingOrFollowers } from "../services/firebase";
import Spinner from "./Spinner";
const FollowingTab = ({ user }) => {
  const [following, setFollowing] = useState(null);
  const history = useHistory();
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
        <button
          onClick={() => history.push(`/profile/${user.username}/followers`)}
        >
          Followers
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
        {!following && <Spinner></Spinner>}
        {following && following.length === 0 && (
          <p style={{ margin: "5rem 0", textAlign: "center" }}>
            there is no following yet
          </p>
        )}
      </div>
    </>
  );
};

export default FollowingTab;
