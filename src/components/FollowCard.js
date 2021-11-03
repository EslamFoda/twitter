import './FollowCard.css';
import Avatar, { AvatarConfig, genConfig } from 'react-nice-avatar';
import { database,FieldValue } from '../library/firebase';
import { useState } from 'react';
import useCurrentUser from '../hooks/useCurrentUser';
import { Link } from 'react-router-dom';
const FollowCard = ({ fullName, username, id , docId }) => {
  const { activeUser } = useCurrentUser();
  const config = genConfig(AvatarConfig);
 

  return (
    <>
     {activeUser && <div className="follow_card">
      <Avatar style={{ width: "3rem", height: "3rem" }} {...config} />
      <div className="text">
        <Link to={`/profile/${username}`}>{fullName}</Link>
        <p>@{username}</p>
      </div>
      <button onClick={()=>{
        database
          .collection("users")
          .doc(activeUser.docId)
          .update({
            following: FieldValue.arrayUnion(id)
          });
          database
            .collection("users")
            .doc(docId)
            .update({
              followers: FieldValue.arrayUnion(activeUser.userId)
            });
      }}>Follow</button>
    </div>}
    </>
  );
};

export default FollowCard;
