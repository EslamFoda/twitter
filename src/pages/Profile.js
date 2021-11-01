import LeftMenu from "../components/LeftMenu";
import RightSection from "../components/RightSection";
import UserProfile from "../components/UserProfile";
const Profile = () => {
 return (
   <div className="main-timeline">
     <LeftMenu />
     <UserProfile />
     <RightSection />
   </div>
 );
};

export default Profile;
