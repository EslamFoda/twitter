import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LeftMenu from './components/LeftMenu';
import MainSection from './components/MainSection';
import RightSection from './components/RightSection';
import Welcome from "./pages/Welcome";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Test from './pages/Test';
function App() {
  return (
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
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/test'>
            <Test/>
          </Route>
          <Route path='/logout'>
            <Logout />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
