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


function App() {
  const [isOpen,setIsOpen] = useState(false)
  return (
    <DeleteModelContext.Provider value={{ isOpen, setIsOpen }}>
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
          </Switch>
        </Router>
      </div>
    </DeleteModelContext.Provider>
  );
}

export default App;
