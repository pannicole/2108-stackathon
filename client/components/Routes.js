import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
// import AllPosts from "./AllPosts"


const Routes = () => {
  return (
    <Router>
      <div id = "app">
        Hello!!
        {/* <Route exact path = "/" component = {() => {return <h1>Home page</h1> }} />
        <Route exact path = "/posts" component = {AllPosts} /> */}
      </div>
    </Router>
  )
}

export default Routes;
