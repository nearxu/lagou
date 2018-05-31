import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthRoute from "./component/auth";
import Login from "./container/login";
import Register from "./container/register";
import BossInfo from "./container/bossinfo";
import GeniusInfo from "./container/geniusinfo";
import Dashboard from "./container/dashboard";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducer";
import "./config";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
const Boss = () => {
  return <div>hello boss</div>;
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/boss" component={Boss} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
