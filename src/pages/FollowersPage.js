import LeftMenu from "../components/LeftMenu";
import RightSection from "../components/RightSection";
import GetFollowers from "../components/GetFollowers";
const FollowersPage = () => {
  return (
    <div className="main-timeline">
      <LeftMenu />
      <GetFollowers />
      <RightSection />
    </div>
  );
};
 
export default FollowersPage;