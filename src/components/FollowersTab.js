import { useEffect, useState } from 'react';
import { database } from '../library/firebase';
import Followers from './Followers';
import { Link } from 'react-router-dom';
import './ProfileTabs.css'
const FollowersTab = ({ user }) => {
    const [followers,setFollowers] = useState(null)
  function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  useEffect(()=>{
      const unsub = database.collection('users').where('userId','in',user.followers).onSnapshot(snap=>{
          const result = []
          snap.docs.forEach(user=>{
              result.push({ ...user.data(), id: user.id });
          })
          setFollowers(result)
      })

      return ()=> unsub()
  },[user])

  return (
    <>
      <div className="tab followers_tab">
        <button
          className="tablinks active"
          onClick={(e) => {
            openCity(e, "London");
          }}
          id="defaultOpen"
        >
          Followers
        </button>
        <button>
        <Link to={`/profile/${user.username}/following`}>Following</Link>
        </button>
      </div>

      <div id="London" className="tabcontent active-tab">
        {followers &&
          followers.map((profile) => (
            <Followers
              key={profile.userId}
              fullName={profile.fullName}
              username={profile.username}
              id={profile.userId}
              docId={profile.docId}
            />
          ))}
      </div>

      <div id="Paris" className="tabcontent"></div>
    </>
  );
};
 
export default FollowersTab;