import React from "react";
import "./App.css";
import FrontpageLayout from "./components/frontpage/Frontpage-layout";
import AddWorkEntryForm from "./components/worktimepage/AddWorkEntryForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/addworkentry" component={() => <AddWorkEntryForm />} />
          <Route path="/" component={() => <FrontpageLayout />} />
        </Switch>
      </div>
    </Router>
  );
}
