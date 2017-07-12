import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import './App.css';
import registerServiceWorker from './registerServiceWorker'
import AuthPage from "./components/_pages/AuthPage"
import Dashboard from "./components/_pages/Dashboard"
import Scoreboard from "./components/_pages/Scoreboard"
import Course from "./components/_pages/Course"
import AllCourses from "./components/_pages/AllCourses"
import AdminCourseList from './components/Admin/_pages/Courses'
import AdminUserList from './components/Admin/_pages/Users'
import NotFound from "./components/_pages/404"
import Settings from "./components/_pages/Settings"
import Task from "./components/_pages/Task"


const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={AuthPage}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/scoreboard" component={Scoreboard}/>
                <Route path="/course/:courseString/:taskString/process" component={Task}/>
                <Route path="/course/:string" component={Course}/>
                <Route exact path="/admin/courselist" component={AdminCourseList}/>
                <Route exact path="/admin/userlist" component={AdminUserList}/>
                <Route exact path="/courselist" component={AllCourses}/>
                <Route path="/settings" component={Settings}/>
            </Switch>
        </Router>
    );
  }
}

export default App;

registerServiceWorker();