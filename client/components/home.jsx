import React, { Component } from 'react';
import Header from './header.jsx';
import DealsFeed from './deals-feed';

class Home extends Component {
  render() {
    const {
      setDetailView,
      restaurants,
      handleInit,
      updateLatAndLong,
      updatecity,
      updateUserDefault
    } = this.props;
    if (restaurants.length === 0) {
      return <h3>Loading...</h3>;
    } else {
      return (
        <>
          <Header
            updateUserDefault={updateUserDefault}
            updatecity={updatecity}
            updateLatAndLong={updateLatAndLong}
            handleInit={handleInit}
          />
          <DealsFeed restaurants={restaurants} setDetailView={setDetailView} />
        </>
      );
    }
  }
}

export default Home;
