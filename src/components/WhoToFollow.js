import './WhoToFollow.css';
import FollowCard from './FollowCard';
import { useEffect, useState } from 'react';
import { getSuggestedFollowers } from '../services/firebase';
import useCurrentUser from '../hooks/useCurrentUser';
const WhoToFollow = () => {
  const {activeUser} = useCurrentUser()
  const [profiles,setProfiles] = useState(null)
  useEffect(() => {
    async function suggestedFollower() {
      const result = await getSuggestedFollowers(
        activeUser.userId,
        activeUser.following
      );
      setProfiles(result);
      
    }
    if (activeUser) {
      suggestedFollower();
    }
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
            />
          ))}
          <p>Show more</p>
        </div>
      )}
    </div>
  );
};

export default WhoToFollow;
