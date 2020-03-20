import React, { Component } from 'react';
import Header from './header.jsx';
import DealsFeed from './deals-feed';

class Home extends Component {
  setDetailView(id) {
    this.props.setDetailViewCallback(id);
  }

  render() {
    return (
      <>
        <Header />
        <DealsFeed
          restaurants={this.props.restaurants}
          setDetailViewCallback={this.setDetailView} />
      </>
    );
  }
}

export default Home;
