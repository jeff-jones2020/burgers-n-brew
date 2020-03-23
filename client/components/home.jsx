import React, { Component } from 'react';
import Header from './header.jsx';
import DealsFeed from './deals-feed';

class Home extends Component {
  render() {
    const {
      updatecity,
      updateLatAndLong,
      setDetailView,
      restaurants,
      setFilters,
      priceFilter
    } = this.props;

    const headerComponent = (
      <Header
        setFilters={setFilters}
        updatecity={updatecity}
        updateLatAndLong={updateLatAndLong}
        priceFilter={priceFilter}
      />
    );
    if (restaurants.length === 0) {
      return (
        <>
          {headerComponent}
          <h3 className="fill-background">Loading...</h3>;
        </>
      );
    } else if (restaurants.length === 1 && typeof restaurants[0] === 'string') {
      return (
        <>
          {headerComponent}
          <h3 className="fill-background">
            No restaurants found. Try changing filters in the burger menu.
          </h3>
          ;
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
