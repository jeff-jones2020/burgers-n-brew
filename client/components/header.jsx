import React, { Component } from 'react';
import DropDown from './dropdown.jsx';
import SideBar from './sidebar';

class Header extends Component {
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
        <DropDown />
        <SideBar className="sidebar" opened={this.state.opened} openSideBar={this.displaySideBar} />
      </div>
    );
  }
}

export default Header;
