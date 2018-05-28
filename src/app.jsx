import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom'
import {TransitionGroup, CSSTransition} from "react-transition-group";

//通用组件
import Layout from 'component/layout/index.jsx';
// import Login from 'page/login/index.jsx';

import Tem from 'page/tem/index.jsx';
import Welcome from 'page/welcome/index.jsx';
import Project from 'page/project/index.jsx';
import ProjectPlaning from 'page/project-planing/index.jsx';
import ProjectDesign from 'page/project-design/index.jsx';
import ProjectProcess from 'page/project-process/index.jsx';
import ProjectProcessOpera from 'page/project-process/project-process-opera/index.jsx';
import CommandWarning from 'page/command-warning/index.jsx';
import CommandContingency from 'page/command-contingency/index.jsx';
import SewageOrganization from 'page/sewage-organization/index.jsx';
import SewageProject from 'page/sewage-project/index.jsx';
import SewageProjectOpera from 'page/sewage-project/sewage-project-opera/index.jsx';
import SewageProjectAddone from 'page/sewage-project/addone/index.jsx';
import SewageEvalute from 'page/sewage-evaluate/index.jsx';
import ServerInfo from 'page/server-info/index.jsx';
import ServerAlert from 'page/server-alert/index.jsx';
import ServerAlertForm from 'page/server-alert-form/index.jsx';
import ServerSuggestPublic from 'page/server-suggest-public/index.jsx';
import Chart from 'page/Chart/index.jsx';
import Ceshi from 'page/Ceshi/index.jsx';

class App extends React.Component {
    render() {
        return (
          <Router>
            <Switch>
              <Route path="/welcome" component={Welcome}></Route>
              <Route path="/" render={({location}) => (
                <Layout>

                      <Switch location={location}>
                        <Redirect exact from="/" to="/welcome"/>
                        <Route exact path="/project" component={Project}/>
                        <Route path="/project-planing" component={ProjectPlaning}/>
                        <Route path="/project-design" component={ProjectDesign}/>
                        <Route exact path="/project-process" component={ProjectProcess}/>
                        <Route exact path="/project-process/operation/:proNum" component={ProjectProcessOpera}/>
                        <Route exact path="/command-warning" component={CommandWarning}/>
                        <Route exact path="/command-contingency" component={CommandContingency}/>
                        <Route exact path="/sewage-organization" component={SewageOrganization}/>
                        <Route exact path="/sewage-project" component={SewageProject}/>
                        <Route exact path="/sewage-project/addone" component={SewageProjectAddone}/>
                        <Route exact path="/sewage-project/operation/:proId" component={SewageProjectOpera}/>
                        <Route exact path="/sewage-evaluate" component={SewageEvalute}/>
                        <Route exact path="/server-info" component={ServerInfo}/>
                        <Route exact path="/server-alert" component={ServerAlert}/>
                        <Route exact path="/server-alert-form" component={ServerAlertForm}/>
                        <Route exact path="/server-suggest-public" component={ServerSuggestPublic}/>
                        <Route exact path="/ceshi" component={Ceshi}/>
                        <Route exact path="/chart" component={Chart}/>
                      </Switch>

                </Layout>)}>
              </Route>
            </Switch>
          </Router>
      )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
