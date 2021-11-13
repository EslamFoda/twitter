import LeftMenu from "./LeftMenu";
import RightSection from "../components/RightSection";
import Footer from "../components/Footer";
const Layout = ({children}) => {
    return (
      <div className="main-timeline">
        <LeftMenu />
        {children}
        <RightSection />
        <Footer />
      </div>
    );
}
 
export default Layout;