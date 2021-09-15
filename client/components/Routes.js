import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import AllPosts from "./AllPosts"
import AllUsers from "./AllUsers"


const Routes = () => {
  return (
    <Router>
      <div id = "app">
        <Route exact path = "/" component = {() => {return <h1>Home page</h1> }} />
        <Route exact path = "/posts" component = {AllPosts} />
        <Route exact path = "/users" component = {AllUsers} />
      </div>
    </Router>
  )
}

export default Routes;
