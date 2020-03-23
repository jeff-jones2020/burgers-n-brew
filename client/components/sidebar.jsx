import React from 'react';
import LocationDropDown from './location-dropdown.jsx';
import CurrentUser from './currentUser.jsx';
import PriceFilter from './price-filter.jsx';
import { CSSTransition } from 'react-transition-group';
import { Consumer } from '../store.jsx';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleIsOpen = this.handleIsOpen.bind(this);
  }

  handleIsOpen() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
      currentCityId: 1
    });
  }

  render() {
    const { isOpen } = this.state;
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
              <Consumer>
                {({ users, currentUserId }) => (
                  <div className="account">
                    {users.map((user, i) => {
                      if (isOpen) {
                        return (
                          <div key={i}>
                            <CurrentUser
                              isOpen={isOpen}
                              user={user}
                              key={user.city}
                              handleIsOpen={this.handleIsOpen}
                            />
                          </div>
                        );
                      } else {
                        if (currentUserId === user.id) {
                          return (
                            <div key={i}>
                              <CurrentUser
                                isOpen={isOpen}
                                user={user}
                                key={user.city}
                                handleIsOpen={this.handleIsOpen}
                              />
                            </div>
                          );
                        }
                      }
                    })}
                  </div>
                )}
              </Consumer>
              <Consumer>
                {({ setFilters, priceFilter }) => (
                  <div className="price-filter">
                    <PriceFilter
                      setFilters={setFilters}
                      priceFilter={priceFilter}
                    />
                  </div>
                )}
              </Consumer>
              <div className="proximity-filter">
                <div className="filter-icon" />
              </div>
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
