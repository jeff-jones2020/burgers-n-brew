import React, { Component } from 'react';
import SideBar from './sidebar';
import DesktopSideBar from './desktop-sidebar';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      viewWidth: window.innerWidth
    };
    this.displaySideBar = this.displaySideBar.bind(this);

    window.addEventListener('resize', () => {
      this.setState({ viewWidth: window.innerWidth });
    });
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
    const header = this.state.viewWidth < 700
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
