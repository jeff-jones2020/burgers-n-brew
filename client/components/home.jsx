import React, { Component } from 'react';
import Header from './header.jsx';
import DealsFeed from './deals-feed';

class Home extends Component {
  render() {
    const { getRestaurantByCity, setDetailView } = this.props;
    return (
      <>
        <Header getRestaurantByCity={getRestaurantByCity} />
        <DealsFeed
          restaurants={this.props.restaurants}
          setDetailView={setDetailView}
        />
      </>
    );
  }
}

export default Home;
