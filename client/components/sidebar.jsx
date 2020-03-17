import React from 'react';
class SideBar extends React.Component {
  render() {
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
}

export default SideBar;
