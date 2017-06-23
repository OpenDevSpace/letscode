import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import './App.css';
import registerServiceWorker from './registerServiceWorker'
import AuthPage from "./components/_pages/AuthPage"
import Dashboard from "./components/_pages/Dashboard"
import Course from "./components/_pages/Course"
import AdminCourseList from './components/Admin/_pages/Courses'
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
                <Route path="/course/:number/edit" component={Task}/>
                <Route path="/course/:number" component={Course}/>
                <Route path="/courselist" component={AdminCourseList}/>
                <Route path="/settings" component={Settings}/>
                <Route path='*' component={NotFound} />
            </Switch>
        </Router>
    );
  }
}

export default App;

registerServiceWorker();