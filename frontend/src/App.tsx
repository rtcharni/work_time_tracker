import React, { useEffect, useState } from "react";
import "./App.css";
import FrontpageLayout from "./components/frontpage/Frontpage-layout";
import AddWorkEntryForm from "./components/worktimepage/AddWorkEntryForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Config } from "../../models";
import Loginpage from "./components/loginpage/Loginpage";

const mockConfig: Config = {
  workEntryFields: ["title", "details", "customerName"],
  testNumber: 22,
  testString: "test string",
};

export default function App() {
  // fetch config data for logged in customer
  // add context global store

  const [config, setConfig] = useState<Config | null>(null);
  useEffect(() => {
    console.log("App mounted, use effect");
    setConfig(mockConfig);
    // return () => {
    // do cleanup
    // }
  }, []);

  // TODO user is logged in validation on routes!!!
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={() => <Loginpage />} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/frontpage" component={() => <FrontpageLayout />} />
          <Route
            path="/addworkentry"
            component={() => <AddWorkEntryForm config={config as Config} />}
          />
        </Switch>
      </div>
    </Router>
  );
}
