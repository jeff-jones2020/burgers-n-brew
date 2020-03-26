import React, { Component } from 'react';
import Header from './header.jsx';
import DealsFeed from './deals-feed';

class Home extends Component {
  render() {
    const { setDetailView, restaurants, signOutUser, city } = this.props;
    if (!city) {
      return (
        <>
          <Header />
          <h3 className="fill-background">
            No restaurants found. Please enter a city name or use your default
            location.
          </h3>
        </>
      );
    } else if (restaurants.length === 0) {
      return (
        <>
          <Header />
          <h3 className="fill-background">Loading...</h3>
        </>
      );
    } else if (restaurants.length === 1 && typeof restaurants[0] === 'string') {
      return (
        <>
          <Header />
          <h3 className="fill-background">
            No restaurants found. Try changing filters in the burger menu.
          </h3>
        </>
      );
    } else {
      return (
        <>
          <Header signOutUser={signOutUser} />
          <DealsFeed restaurants={restaurants} setDetailView={setDetailView} />
        </>
      );
    }
  }
}

export default Home;
