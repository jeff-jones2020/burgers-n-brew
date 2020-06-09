import React, { Component } from 'react';
import SideBar from './sidebar';
import DesktopSideBar from './desktop-sidebar';

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
    const { signOutUser } = this.props;
    const header = window.screen.width <= 1000
      ? <SideBar signOutUser={signOutUser} opened={this.state.opened} displaySideBar={this.displaySideBar} />
      : <DesktopSideBar signOutUser={signOutUser} />;
    return (
      <div id="bnb-banner" className="mb-3 header page-content with-sidebar">
        <div id="banner-background" />
        <h1>Burgers N Brew</h1>
        {header}
      </div>
    );
  }
}

export default Header;
