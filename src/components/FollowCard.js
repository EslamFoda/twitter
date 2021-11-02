import './FollowCard.css';
import Avatar, { AvatarConfig, genConfig } from 'react-nice-avatar';
import { database,FieldValue } from '../library/firebase';
import { useState } from 'react';
import useCurrentUser from '../hooks/useCurrentUser';
import { Link } from 'react-router-dom';
const FollowCard = ({ fullName, username, id , docId }) => {
  const { activeUser } = useCurrentUser();
  const [isFollowing,setIsFollowing] = useState(false)
  const config = genConfig(AvatarConfig);
 

  return (
    <>
    {!isFollowing && <div className="follow_card">
      <Avatar style={{ width: "3rem", height: "3rem" }} {...config} />
      <div className="text">
        <Link to={`/profile/${username}`}>{fullName}</Link>
        <p>@{username}</p>
      </div>
      <button onClick={()=>{
        setIsFollowing(true)
        const followed = false
        database
          .collection("users")
          .doc(activeUser.docId)
          .update({
            following: followed
              ? FieldValue.arrayRemove(id)
              : FieldValue.arrayUnion(id),
          });
          database
            .collection("users")
            .doc(docId)
            .update({
              followers: followed
                ? FieldValue.arrayRemove(activeUser.userId)
                : FieldValue.arrayUnion(activeUser.userId),
            });
      }}>Follow</button>
    </div>}
    </>
  );
};

export default FollowCard;
