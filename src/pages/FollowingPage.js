import LeftMenu from "../components/LeftMenu";
import RightSection from "../components/RightSection";
import GetFollowing from "../components/GetFollowing";
const FollowingPage = () => {
  return (
    <div className="main-timeline">
      <LeftMenu />
      <GetFollowing />
      <RightSection />
    </div>
  );
};

export default FollowingPage;
