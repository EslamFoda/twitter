import LeftMenu from "../components/LeftMenu";
import RightSection from "../components/RightSection";
import Notify from "../components/Notify";
import Footer from "../components/Footer";
const Notfications = () => {
    return (
      <div className="main-timeline">
        <LeftMenu />
        <Notify />
        <RightSection />
        <Footer />
      </div>
    );
}
 
export default Notfications;