import LeftMenu from "../components/LeftMenu";
import RightSection from "../components/RightSection";
import GetFollowers from "../components/GetFollowers";
import Footer from "../components/Footer";
const FollowersPage = () => {
  return (
    <div className="main-timeline">
      <LeftMenu />
      <GetFollowers />
      <RightSection />
      <Footer />
    </div>
  );
};

export default FollowersPage;
