import React, { Component } from 'react';
import Header from './header.jsx';
import DealsFeed from './deals-feed';

class Home extends Component {
  render() {
    const {
      getRestaurantByCity,
      getRestaurantByLatLong,
      setDetailView,
      restaurants,
      setFilters
    } = this.props;
    if (restaurants.length === 0) {
      return <h3>Loading...</h3>;
    } else {
      return (
        <>
          <Header
            getRestaurantByLatLong={getRestaurantByLatLong}
            getRestaurantByCity={getRestaurantByCity}
            setFilters={setFilters}
          />
          <DealsFeed restaurants={restaurants} setDetailView={setDetailView} />
        </>
      );
    }
  }
}

export default Home;
