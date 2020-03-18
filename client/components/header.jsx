import React from 'react';
import SideBar from './sidebar';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.displaySideBar = this.displaySideBar.bind(this);
  }

  displaySideBar() {
    this.setState({ opened: !this.state.opened });
  }

  render() {
    return (
      <div className="header">
        <h1>Burgers N Brew</h1>
        <SideBar className="sidebar" opened={this.state.opened} openSideBar={this.displaySideBar} />
      </div>
    );
  }
}

export default Header;
