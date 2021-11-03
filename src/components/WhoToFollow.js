import "./WhoToFollow.css";
import FollowCard from "./FollowCard";
import { useEffect, useState } from "react";
import { getSuggestedFollowers } from "../services/firebase";
import useCurrentUser from "../hooks/useCurrentUser";
import { database } from "../library/firebase";
import { Link } from "react-router-dom";
const WhoToFollow = () => {
  const { activeUser } = useCurrentUser();
  const [profiles, setProfiles] = useState(null);
  useEffect(() => {
    async function suggestedFollower() {
      const result = await getSuggestedFollowers(
        activeUser.userId,
        activeUser.following
      );
      setProfiles(result);
    }

    const unsub = database.collection("tweets").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          if (activeUser) {
            suggestedFollower();
          }
        }
        if (change.type === "removed") {
          if (activeUser) {
            suggestedFollower();
          }
        }
        if (change.type === "modified") {
          if (activeUser) {
            suggestedFollower();
          }
        }
      });
    });
    return () => unsub();
  }, [activeUser]);
  return (
    <div>
      {profiles && (
        <div className="who_to_follow">
          <h3>Who to follow</h3>
          {profiles.map((profile) => (
            <FollowCard
              key={profile.userId}
              fullName={profile.fullName}
              username={profile.username}
              id={profile.userId}
              docId={profile.docId}
              profilePic={profile.profilePic}
            />
          ))}
          <p>
            <Link to="/connect_people">Show more</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default WhoToFollow;
