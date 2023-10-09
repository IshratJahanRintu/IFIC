import React from 'react';
import './App.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import LoginAuthNew from "./views/LoginAuth/LoginAuthNew";
import VivrData from "./views/Home/VivrData";
import IceFeedback from "./views/IceFeedback/IceFeedback";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import ErrorPage from "./views/Error/ErrorPage";
import {APP_BASE_URL} from './config/Constants';
import Content from "./Components/Contents/Content";

function App() {
  return (
      <Router basename={APP_BASE_URL} >
        <Switch>
          <Route path={"/error"} exact component={ErrorPage}/>
          <Route path={"/auth"} exact component={LoginAuthNew}/>
          <Route path={"/home"} exact component={VivrData}/>
          <Route path={"/content"} exact component={Content}/>
          <Route path={"/feedback"} exact component={IceFeedback}/>
          <Redirect from="*" to="/error" />
        </Switch>
      </Router>
  );
}

export default App;
