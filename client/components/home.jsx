import React, { Component } from 'react';
import Header from './header.jsx';
import DealsFeed from './deals-feed';

class Home extends Component {
  render() {
    const {
      getRestaurantByCity,
      getRestaurantByLatLong,
      setDetailView,
      restaurants
    } = this.props;
    return (
      <>
        <Header
          getRestaurantByLatLong={getRestaurantByLatLong}
          getRestaurantByCity={getRestaurantByCity}
        />
        <DealsFeed restaurants={restaurants} setDetailView={setDetailView} />
      </>
    );
  }
}

export default Home;
