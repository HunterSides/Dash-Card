import React from "react";

import Dashboard from "./views/Dashboard";

import LandingPage from "./views/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/dashboard/:id" component={Dashboard} />
      </Switch>
    </div>
  );
}
