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
      updateUserDefault,
      priceFilter
    } = this.props;

    const headerComponent = (
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
        priceFilter={priceFilter}
      />
    );
    if (restaurants.length === 0) {
      return (
        <>
          {headerComponent}
          <h3 className='fill-background'>Loading...</h3>;
        </>
      );
    } else if (restaurants.length === 1 && typeof restaurants[0] === 'string') {
      return (
        <>
          {headerComponent}
          <h3 className='fill-background'>No restaurants found. Try changing filters in the burger menu.</h3>;
        </>
      );
    } else {
      return (
        <>
          {headerComponent}
          <DealsFeed restaurants={restaurants} setDetailView={setDetailView} />
        </>
      );
    }
  }
}

export default Home;
