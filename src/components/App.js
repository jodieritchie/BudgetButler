import React from "react";
import styles from "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "./Login";
import Signup from "./Signup";
import Footer from "./Footer";
import GrocerySetup from "../pages/GrocerySetup";
import Overview from "../pages/Overview";
import Profile from "../pages/profile";
import { AuthProvider } from "../contexts/AuthContext";
import Register from "../pages/register";
import LandingPage from "../pages/landingPage";

// right now have it so that the pages below are app's children & app & signup are both root components
// want it to so that signup is child
// signup -> login -> everything else

function App() {
  return (
    <>
      
      <Router>
      <Navbar />
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/register" component={Register} />

            
              {/* <Route exact path="/home" component={Home} /> */}
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/overview" component={Overview} />
              <Route exact path="/groceries" component={GrocerySetup} />
            
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
