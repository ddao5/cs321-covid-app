import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";

import App from "./App";
import News from "./components/Pages/News";
import About from "./components/Pages/About";

ReactDOM.render(
  <BrowserRouter>
  <div>
      <Switch>
        <Route path="/" component={App} exact/>
        <Route path="/news" component={News}/>
        <Route path="/about" component={About}/>
      </Switch>
  </div>
  </BrowserRouter>,
  document.getElementById("root")
);