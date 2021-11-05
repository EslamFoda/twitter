import LeftMenu from "../components/LeftMenu";
import RightSection from "../components/RightSection";
import SeeMoreUsers from "../components/SeeMoreUsers";
import Footer from "../components/Footer";
const ConnectPeople = () => {
  return (
    <div className="main-timeline">
      <LeftMenu />
      <SeeMoreUsers />
      <RightSection />
      <Footer/>
    </div>
  );
};

export default ConnectPeople;
