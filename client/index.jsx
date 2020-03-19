import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
);

const fetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

fetch('api/yelp/businesses/search/' + 'location=irvine', fetchOptions)
  .then(response => response.json())
  .then(data => console.log(data));
