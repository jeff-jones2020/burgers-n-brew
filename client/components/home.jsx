import React, { Component } from 'react';
import Header from './header.jsx';
import DealsFeed from './deals-feed';

class Home extends Component {
  render() {
    const {
      getRestaurantByCity,
      setDetailView,
      restaurants,
      users,
      currentUserId,
      handleInit,
      updateLatAndLong,
      city,
      zipCode
    } = this.props;
    if (restaurants.length === 0) {
      return <h3>Loading...</h3>;
    } else {
      return (
        <>
          <Header
            city={city}
            zipCode={zipCode}
            updateLatAndLong={updateLatAndLong}
            handleInit={handleInit}
            users={users}
            currentUserId={currentUserId}
            getRestaurantByCity={getRestaurantByCity}
          />
          <DealsFeed restaurants={restaurants} setDetailView={setDetailView} />
        </>
      );
    }
  }
}

export default Home;
