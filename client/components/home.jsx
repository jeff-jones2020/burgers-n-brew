import React, { Component } from 'react';
import Header from './header.jsx';
import DealsFeed from './deals-feed';

class Home extends Component {
  render() {
    const {
      setDetailView,
      restaurants,
      setFilters,
      users,
      currentUserId,
      handleInit,
      getRestaurantByLatLong,
      updateLatAndLong,
      city,
      zipCode,
      updatecity,
      updateUserDefault
    } = this.props;
    if (restaurants.length === 0) {
      return <h3>Loading...</h3>;
    } else {
      return (
        <>
          <Header
            getRestaurantByLatLong={getRestaurantByLatLong}
            setFilters={setFilters}
            updateUserDefault={updateUserDefault}
            updatecity={updatecity}
            city={city}
            zipCode={zipCode}
            updateLatAndLong={updateLatAndLong}
            handleInit={handleInit}
            users={users}
            currentUserId={currentUserId}
          />
          <DealsFeed restaurants={restaurants} setDetailView={setDetailView} />
        </>
      );
    }
  }
}

export default Home;
