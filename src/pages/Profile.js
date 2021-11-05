import LeftMenu from "../components/LeftMenu";
import RightSection from "../components/RightSection";
import UserProfile from "../components/UserProfile";
import Footer from "../components/Footer";
const Profile = () => {
 return (
   <div className="main-timeline">
     <LeftMenu />
     <UserProfile />
     <RightSection />
     <Footer />
   </div>
 );
};

export default Profile;
