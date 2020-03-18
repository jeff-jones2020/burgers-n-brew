import React, { Component } from 'react';
import DropDown from './dropdown.jsx';

class Header extends Component {
  render() {
    return (
      <div>
        <DropDown />
        <h1>Burgers N Brew</h1>
      </div>
    );
  }
}

export default Header;
