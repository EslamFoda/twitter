import {  useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth,database } from '../library/firebase';
import { doesUserExist } from '../services/firebase';
import { doesEmailExist } from '../services/firebase';
import './Signup.css'
const Signup = () => {
    const history = useHistory()
    const [username, setUserName] = useState("");
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const signUp = async(e)=>{
        e.preventDefault();
        setError('')
        const checkUser = await doesUserExist(username);
        const checkEmail = await doesEmailExist(email)
        if (checkUser.length === 0 && checkEmail.length === 0) {
          try {
            const createAccount = await auth.createUserWithEmailAndPassword(
              email,
              password
            );
            await createAccount.user.updateProfile({
              displayName: username,
            });
            const newUser = {
              username,
              fullName,
              email,
              profilePic:
                "https://i.pinimg.com/474x/b7/cf/46/b7cf46c96e503fdec995645e70d95705.jpg",
              bio: "",
              followers: [],
              following: [],
              userId: createAccount.user.uid,
              createdAt: Date.now(),
              backgroundImage:'',
              location:''
            };
            database.collection("users").add({...newUser});
            history.push('/home')
          } catch (error) {
            setError(error.message);
          }
        } else {
            if (checkUser.length > 0){
                setError("That username is alrady taken, please try another.");
            } else if(checkEmail.length > 0){
                setError("That email is alrady taken, please try another.");
            }
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
          <form onSubmit={signUp} className="main-form">
            <h2 style={{ marginBottom: "2rem" }}>Create your account</h2>
            <input
              type="text"
              required
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
            />
            <input
              type="text"
              required
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
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
            {(username.length > 0) &
            (password.length > 0) &
            (email.length > 0) &
            (fullName.length > 0) ? (
              <button className="signup-btn">Sign Up</button>
            ) : (
              <button disabled className="signup-btn">
                Sign Up
              </button>
            )}
            <p style={{ textAlign: "center" }}>
              Have an account?{" "}
              <Link to="/login" style={{ color: "#1a7cbf" }}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
}
 
export default Signup;