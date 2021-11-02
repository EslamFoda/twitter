import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LeftMenu from "./components/LeftMenu";
import MainSection from "./components/MainSection";
import RightSection from "./components/RightSection";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Tweet from "./pages/Tweet";
import DeleteModelContext from "./context/DeleteModelContext";
import { useState } from "react";
import NotFound from "./components/NotFound";
import Profile from "./pages/Profile";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";
function App() {
  const [isOpen,setIsOpen] = useState(false)
  const [tweetModel,setTweetModel] = useState(false)
  const [commentModel,setCommentModel] = useState(false)
  return (
    <DeleteModelContext.Provider
      value={{
        isOpen,
        setIsOpen,
        tweetModel,
        setTweetModel,
        commentModel,
        setCommentModel,
      }}
    >
      <div className="App">
        <Router>
          <Switch>
            <Route path="/home">
              <div className="main-timeline">
                <LeftMenu />
                <MainSection />
                <RightSection />
              </div>
            </Route>
            <Route path="/tweet/:username/:id">
              <Tweet />
            </Route>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route exact path="/profile/:username">
              <Profile />
            </Route>
            <Route path="/profile/:username/followers">
              <FollowersPage />
            </Route>
            <Route path="/profile/:username/following">
              <FollowingPage/>
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </DeleteModelContext.Provider>
  );
}

export default App;
