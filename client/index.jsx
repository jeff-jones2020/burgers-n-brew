import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();

ReactDOM.render(
  <Router history={customHistory}>
    <App />
  </Router>,
  document.querySelector('#root')
);
