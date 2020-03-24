import React from 'react';
import LocationDropDown from './location-dropdown.jsx';
import PriceFilter from './price-filter.jsx';
import RadiusFilter from './radius-filter.jsx';
import { CSSTransition } from 'react-transition-group';
import { Consumer } from '../store.jsx';

class SideBar extends React.Component {
  render() {
    const { displaySideBar, opened } = this.props;
    return (
      <>
        <div className="sidebar-icon" onClick={displaySideBar} />
        <div className="sidebar" onClick={displaySideBar}>
          <CSSTransition
            in={opened}
            classNames="slide-in"
            unmountOnExit
            timeout={500}
          >
            <div className="sidebar-container">
              <div className="location">
                <LocationDropDown />
              </div>
              <div className="account">
                <Consumer>
                  {({ user }) => (
                    <div>
                      <i className="far fa-user-circle"></i>
                      &nbsp; <span>{user.name}</span>
                    </div>
                  )}
                </Consumer>
              </div>
              <Consumer>
                {({ setFilters, currentPriceFilter }) => (
                  <div className="filter">
                    <PriceFilter
                      setFilters={setFilters}
                      currentPriceFilter={currentPriceFilter}
                    />
                  </div>
                )}
              </Consumer>
              <Consumer>
                {({ setFilters, currentRadiusFilter }) => (
                  <div className="filter">
                    <RadiusFilter
                      setFilters={setFilters}
                      currentRadiusFilter={currentRadiusFilter}
                    />
                  </div>
                )}
              </Consumer>
              <div className="vegetarian-filter">
                <div className="filter-icon" />
              </div>
            </div>
          </CSSTransition>
        </div>
      </>
    );
  }
}

export default SideBar;
