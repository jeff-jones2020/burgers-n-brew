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
      <div>
        <h1>Burgers N Brew</h1>
        <SideBar opened={this.state.opened} openSideBar={this.displaySideBar} />
      </div>
    );
  }
}

export default Header;
