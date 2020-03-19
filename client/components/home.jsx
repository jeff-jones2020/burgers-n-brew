import React, { Component } from 'react';
import Header from './header.jsx';
import Section from './section.jsx';

class Home extends Component {
  render() {
    const { getRestaurantByCity } = this.props;
    return (
      <>
        <Header getRestaurantByCity={getRestaurantByCity} />
        <Section />
      </>
    );
  }
}

export default Home;
