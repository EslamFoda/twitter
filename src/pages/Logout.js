import { Link, useHistory } from "react-router-dom";
import { auth } from "../library/firebase";
const Logout = () => {
    const history = useHistory()
    return (
      <div>
        <div className="signup-container">
          <div className="form-container logout-form">
            <div style={{ textAlign: "center", margin: "1rem 0" }}>
              <i className="lab la-twitter form-twiter-icon"></i>
            </div>
            <form className="main-form">
              <h2>Log out of Twitter?</h2>
              <p style={{ color: "gray", margin: "1rem 0" }}>
                You can always log back in at any time. If you just want to
                switch accounts, you can do that by adding an existing account.{" "}
              </p>

              <button onClick={()=>{
                  auth.signOut()
                  history.push('/')
              }} className="logout-btn">Log out</button>
              <Link to='/home'>
              <button className="cancel-btn">Cancel</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
}
 
export default Logout;