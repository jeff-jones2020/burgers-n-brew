import React, { Component } from 'react';
import SideBar from './sidebar';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.displaySideBar = this.displaySideBar.bind(this);
  }

  displaySideBar(event) {
    if (
      event.target.classList.value === 'sidebar' ||
      event.target.classList.value === 'sidebar-icon'
    ) {
      this.setState({ opened: !this.state.opened });
    }
  }

  render() {
    const {
      getRestaurantByCity,
      users,
      currentUserId,
      handleInit,
      updateLatAndLong
    } = this.props;
    return (
      <div id="bnb-banner" className="mb-3 header">
        <div id="banner-background" />
        <h1>Burgers N Brew</h1>
        <SideBar
          updateLatAndLong={updateLatAndLong}
          handleInit={handleInit}
          users={users}
          currentUserId={currentUserId}
          getRestaurantByCity={getRestaurantByCity}
          opened={this.state.opened}
          openSideBar={this.displaySideBar}
        />
      </div>
    );
  }
}

export default Header;
