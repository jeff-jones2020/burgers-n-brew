import React, { Component } from 'react';
import Header from './header.jsx';
import DealsFeed from './deals-feed';

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <DealsFeed />
      </>
    );
  }
}

export default Home;
