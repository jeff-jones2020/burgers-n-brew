import React from 'react';
import LocationDropDown from './location-dropdown.jsx';
import PriceFilter from './price-filter.jsx';
import RadiusFilter from './radius-filter.jsx';
import { CSSTransition } from 'react-transition-group';
import { Consumer } from '../store.jsx';
import { Link } from 'react-router-dom';

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
            <div className="sidebar-container p-4">
              <div className="location mb-4">
                <LocationDropDown />
              </div>
              <div className="account mb-4">
                <Consumer>
                  {({ user }) => (
                    <div>
                      <i className="far fa-user-circle account-icon"></i>
                      {user.id ? (
                        <span> &nbsp; {user.name}</span>
                      ) : (
                        <>
                          <span>&nbsp; Guest</span>
                          <p>
                            <Link to="/">SignUp/SignIn</Link>
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </Consumer>
              </div>
              <Consumer>
                {({ setFilters, currentPriceFilter }) => (
                  <div className="filter mb-4">
                    <PriceFilter
                      setFilters={setFilters}
                      currentPriceFilter={currentPriceFilter}
                    />
                  </div>
                )}
              </Consumer>
              <Consumer>
                {({ setFilters, currentRadiusFilter }) => (
                  <div className="filter mb-4">
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
