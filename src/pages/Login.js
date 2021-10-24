import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { auth } from "../library/firebase";
const Login = () => {
    const history = useHistory()
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error,setError] = useState('')
        const logIn = async(e)=>{
            e.preventDefault();
            setError('')
            try {
               await auth.signInWithEmailAndPassword(email, password);
               setEmail('')
               setPassword('')
               history.push('/home')
            } catch (error) {
                setError(error.message);
            }
            
            
        }
    return (
      <div className="signup-container">
        <div className="form-container">
          <div className="form-head">
            <div style={{ flexBasis: "50%" }}>
              <i
                className="las la-times form-close-icon"
                onClick={() => history.push("/")}
              ></i>
            </div>
            <div style={{ flexBasis: "50%" }}>
              <i className="lab la-twitter form-twiter-icon"></i>
            </div>
          </div>
          <form onSubmit={logIn} className="main-form">
            <h2 style={{ marginBottom: "2rem" }}>
              To get started, first enter your email & password
            </h2>
            <input
              type="email"
              required
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <p style={{ color: "crimson", textAlign: "center" }}>{error}</p>

            {(password.length > 0) & (email.length > 0) ? (
              <button className="signup-btn">Log in</button>
            ) : (
              <button disabled className="signup-btn">
                Log in
              </button>
            )}
            <p style={{ textAlign: "center" }}>
              Dont have account?{" "}
              <Link to="/signup" style={{ color: "#1a7cbf" }}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
}
 
export default Login;