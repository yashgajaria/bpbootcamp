import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CreatePage from "./components/pages/CreatePage";
import Default from "./components/pages/Default";
import DisplayPage from "./components/pages/DisplayPage";
import NotFound from "./components/pages/NotFound";
import UpdatePage from "./components/pages/UpdatePage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Default} />
        <Route exact path="/entity/create" component={CreatePage} />
        <Route exact path="/entity/update" component={UpdatePage} />
        <Route exact path="/entity" component={DisplayPage} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
