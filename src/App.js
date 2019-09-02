import React from 'react';
import Header from './components/header';
import './App.css';
import './style/skeleton.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApiProxy from './components/apiProxy';
import FullFlow from './components/fullFlow'
import Java from './components/java'
import RequestCycles from './components/requestCycles'
import Microservice from './components/microservice'
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/request-cycle" component={RequestCycles} />
            <Route exact path="/full-flow" component={FullFlow} />
            <Route exact path="/api-proxy" component={ApiProxy} />
            <Route exact path="/Microservice" component={Microservice} />
            <Route exact path="/java" component={Java} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
