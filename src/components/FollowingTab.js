import { useEffect, useState } from "react";
import { database } from "../library/firebase";
import Following from "./Following";
import "./ProfileTabs.css";
import { Link } from "react-router-dom";
const FollowingTab = ({ user }) => {
  const [following, setFollowing] = useState(null);
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
  useEffect(() => {
    const unsub = database
      .collection("users")
      .where("userId", "in", user.following)
      .onSnapshot((snap) => {
        const result = [];
        snap.docs.forEach((user) => {
          result.push({ ...user.data(), id: user.id });
        });
        setFollowing(result);
      });

      return () => unsub()
  }, [user]);

  return (
    <>
      <div className="tab followers_tab">
        <button>
          <Link to={`/profile/${user.username}/followers`}>Followers</Link>
        </button>
        <button
          className="tablinks active"
          onClick={(e) => {
            openCity(e, "Paris");
          }}
          id="defaultOpen"
        >
          Following
        </button>
      </div>

      <div id="London" className="tabcontent"></div>

      <div id="Paris" className="tabcontent active-tab">
        {following &&
          following.map((profile) => (
            <Following
              key={profile.userId}
              fullName={profile.fullName}
              username={profile.username}
              id={profile.userId}
              docId={profile.docId}
            />
          ))}
      </div>
    </>
  );
};

export default FollowingTab;
