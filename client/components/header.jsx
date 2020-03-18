import React from 'react';
import SideBar from './sidebar';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  render() {
    return (
      <div>
        <h1>Burgers N Brew</h1>
        <SideBar opened={this.state.opened} />
      </div>
    );
  }
}

export default Header;
