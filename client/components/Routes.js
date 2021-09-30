import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import AllPosts from "./AllPosts"
import AllUsers from "./AllUsers"
import Matter from "./Matter"
import { Login, Signup } from "./AuthForm"


const Routes = () => {
  return (
    <Router>
      <div id = "app">
        {/* <Login /> */}
        <Route exact path = "/" component = {Matter} />
        <Route exact path = "/posts" component = {AllPosts} />
        <Route exact path = "/users" component = {AllUsers} />
      </div>
    </Router>
  )
}

export default Routes;
