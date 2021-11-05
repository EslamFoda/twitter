import LeftMenu from "../components/LeftMenu";
import RightSection from "../components/RightSection";
import GetFollowing from "../components/GetFollowing";
import Footer from "../components/Footer";
const FollowingPage = () => {
  return (
    <div className="main-timeline">
      <LeftMenu />
      <GetFollowing />
      <RightSection />
      <Footer />
    </div>
  );
};

export default FollowingPage;
