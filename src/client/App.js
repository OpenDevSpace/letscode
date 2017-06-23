import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import AuthPage from "./components/_pages/AuthPage"
import Dashboard from "./components/_pages/Dashboard"
import Course from "./components/_pages/Course"
import AdminCourseList from './components/Admin/_pages/Courses'




const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
        <Router history={history}>
            <div>
                <Route exact path="/" component={AuthPage}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/course/:number" component={Course}/>
                <Route path="/courselist" component={AdminCourseList}/>
           </div>
        </Router>
    );
  }
}

export default App;

registerServiceWorker();