import LeftMenu from "../components/LeftMenu";
import RightSection from "../components/RightSection";
import Status from "../components/Status";
import Footer from "../components/Footer";
const Tweet = () => {
    return (
      <div className="main-timeline">
        <LeftMenu />
        <Status />
        <RightSection />
        <Footer />
      </div>
    );
}
 
export default Tweet;