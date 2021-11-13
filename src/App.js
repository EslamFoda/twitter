import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainSection from "./components/MainSection";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Tweet from "./pages/Tweet";
import DeleteModelContext from "./context/DeleteModelContext";
import { useState } from "react";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";
import ConnectPeople from "./pages/ConnectPeople";
import { Redirect } from "react-router";
import Notfications from "./pages/Notfications";
import useAuth from "./hooks/user-auth";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tweetModel, setTweetModel] = useState(false);
  const [commentModel, setCommentModel] = useState(false);
  const { user } = useAuth();
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
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route path="/signup">
              {!user ? <Signup /> : <Redirect to="/home"></Redirect>}
            </Route>
            <Route path="/login">
              {!user ? <Login /> : <Redirect to="/home"></Redirect>}
            </Route>
            <Route path="/logout">
              {user ? <Logout /> : <Redirect to="/"></Redirect>}
            </Route>
            <Layout>
              <Route path="/home">
                {user ? <MainSection /> : <Redirect to="/"></Redirect>}
              </Route>
              <Route path="/tweet/:username/:id">
                {user ? <Tweet /> : <Redirect to="/"></Redirect>}
              </Route>

              <Route exact path="/profile/:username">
                {user ? <Profile /> : <Redirect to="/"></Redirect>}
              </Route>
              <Route path="/profile/:username/followers">
                {user ? <FollowersPage /> : <Redirect to="/"></Redirect>}
              </Route>
              <Route path="/profile/:username/following">
                {user ? <FollowingPage /> : <Redirect to="/"></Redirect>}
              </Route>
              <Route path="/notfications">
                {user ? <Notfications /> : <Redirect to="/"></Redirect>}
              </Route>
              <Route path="/connect_people">
                {user ? <ConnectPeople /> : <Redirect to="/"></Redirect>}
              </Route>
            </Layout>
          </Switch>
        </Router>
      </div>
    </DeleteModelContext.Provider>
  );
}

export default App;
