import React from 'react';
import LocationDropDown from './location-dropdown.jsx';
import PriceFilter from './price-filter.jsx';
import RadiusFilter from './radius-filter.jsx';
import { CSSTransition } from 'react-transition-group';
import { Consumer } from '../store.jsx';
import UserDropDown from './user-dropdown.jsx';

class DesktopSideBar extends React.Component {
  render() {
    const { signOutUser, isSignedIn } = this.props;
    return (
      <>
        <div className="sidebar">
          <div className="sidebar-container py-4">
            <div className="location py-2">
              <LocationDropDown isSignedIn={isSignedIn} />
            </div>
            <Consumer>
              {({
                user,
                setFilters,
                currentPriceFilter,
                currentRadiusFilter
              }) => (
                <>
                  <div className="account py-2">
                    <UserDropDown signOutUser={signOutUser} user={user} />
                  </div>
                  <div className="filter py-2">
                    <PriceFilter
                      setFilters={setFilters}
                      currentPriceFilter={currentPriceFilter}
                    />
                  </div>
                  <div className="filter py-2">
                    <RadiusFilter
                      setFilters={setFilters}
                      currentRadiusFilter={currentRadiusFilter}
                    />
                  </div>
                </>
              )}
            </Consumer>
          </div>
        </div>
      </>
    );
  }
}

export default DesktopSideBar;
