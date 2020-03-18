import React from 'react';
class SideBar extends React.Component {
  render() {
    const open = this.props.opened;

    if (open) {
      return (
        <div>
          <div className="location">
            <div className="location-icon" />
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
          <div className="ratings">

          </div>
        </div>
      );
    }
    return (
      <div className="sidebar" />
    );
  }
}

export default SideBar;
