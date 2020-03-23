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
    return (
      <div id="bnb-banner" className="mb-3 header">
        <div id="banner-background" />
        <h1>Burgers N Brew</h1>
        <SideBar
          opened={this.state.opened}
          displaySideBar={this.displaySideBar}
        />
      </div>
    );
  }
}

export default Header;
