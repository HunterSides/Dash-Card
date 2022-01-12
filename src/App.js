import React from "react";

import Dashboard from "./views/Dashboard";
import DashboardExample from "./views/DashboardExample";
import LandingPage from "./views/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/dashboard-example" component={DashboardExample} />
        <Route path="/dashboard/:id" component={Dashboard} />
      </Switch>
    </div>
  );
}
