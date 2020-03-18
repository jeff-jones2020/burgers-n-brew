import React from 'react';
import DropDown from './dropdown.jsx';

class SideBar extends React.Component {
  render() {
    const open = this.props.opened;

    if (open) {
      return (
        <div className="sidebar" onClick={this.props.openSideBar}>
          <div className="sidebar-container">
            <div className="location">
              <DropDown />
            </div>
            <div className="account">
              <div className="account-icon" />
            </div>
            <div className="price-filter">
              <div className="filter-icon" />
            </div>
            <div className="proximity-filter">
              <div className="filter-icon" />
            </div>
            <div className="vegetarian-filter">
              <div className="filter-icon" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="sidebar-icon" onClick={this.props.openSideBar} />
    );
  }
}

export default SideBar;
