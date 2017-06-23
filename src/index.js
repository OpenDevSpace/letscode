import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App';
import registerServiceWorker from './client/registerServiceWorker';
import './client/styles/index.css';
import 'semantic-ui-css/semantic.min.css';


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
registerServiceWorker();
