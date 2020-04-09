import React, { useEffect, useState } from "react";
import "./App.css";
import FrontpageLayout from "./components/frontpage/Frontpage-layout";
import AddWorkEntryForm from "./components/worktimepage/AddWorkEntryForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Config } from "../../models";
import Loginpage from "./components/loginpage/Loginpage";

const mockConfig: Config = {
  workFormFields: ["title", "details", "customerName"],
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

  return (
    <Router>
      <div>
        <Switch>
          <Route
            path="/addworkentry"
            component={() => <AddWorkEntryForm config={config as Config} />}
          />
          <Route path="/login" component={() => <Loginpage />} />
          <Route path="/" component={() => <FrontpageLayout />} />
        </Switch>
      </div>
    </Router>
  );
}
