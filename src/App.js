import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./HomeV2/home";
import BirdInfo from "./Info/birdInfo";
import AdminLogin from "./Admin/adminLogin";
import AdminPanel from "./Admin/adminPanel";
import AdminNewForm from "./Admin/adminCreateBird";
import MultiSelectMap from "./MapV2/multiSelectMap";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

export default function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/select-map" component={MultiSelectMap} />
        <Route exact path="/admin/panel/new" component={AdminNewForm} />
        <Route exact path="/admin/panel" component={AdminPanel} />
        <Route exact path="/admin" component={AdminLogin} />
        <Route exact path="/:bird" component={BirdInfo} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
