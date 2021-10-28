import LeftMenu from "../components/LeftMenu";
import RightSection from "../components/RightSection";
import Status from "../components/Status";
const Tweet = () => {
    return (
      <div className="main-timeline">
        <LeftMenu />
        <Status />
        <RightSection />
      </div>
    );
}
 
export default Tweet;