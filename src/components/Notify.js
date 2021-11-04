import { Link } from "react-router-dom";
import NotifyTabs from "./NotifyTabs";
const Notify = () => {
    return (
      <>
        <div className="mainsection">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "sticky",
              top: "0",
              left: "0",
              zIndex: "20",
              background: "rgb(21, 32, 43)",
            }}
          >
            <Link to="/home">
              <i className="las la-arrow-left back-btn"></i>
            </Link>
            <div
              style={{
                marginLeft: "1rem",
                padding: ".5rem 0",
                lineHeight: "1.1",
              }}
            >
              <h3 style={{ padding: ".6rem 0" }}>Notifications</h3>
            </div>
          </div>
          <NotifyTabs />
        </div>
      </>
    );
}
 
export default Notify;