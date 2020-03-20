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
      users,
      currentUserId,
      handleInit
    } = this.props;
    if (restaurants.length === 0) {
      return <h3>Loading...</h3>;
    } else {
      return (
        <>
          <Header
            handleInit={handleInit}
            users={users}
            currentUserId={currentUserId}
            getRestaurantByLatLong={getRestaurantByLatLong}
            getRestaurantByCity={getRestaurantByCity}
          />
          <DealsFeed restaurants={restaurants} setDetailView={setDetailView} />
        </>
      );
    }
  }
}

export default Home;
