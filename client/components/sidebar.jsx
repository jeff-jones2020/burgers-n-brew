import React from 'react';
import LocationDropDown from './location-dropdown.jsx';
import CurrentUser from './currentUser.jsx';
import PriceFilter from './price-filter.jsx';
import { CSSTransition } from 'react-transition-group';

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
    const {
      openSideBar,
      opened,
      users,
      currentUserId,
      handleInit,
      updateLatAndLong,
      city,
      zipCode,
      updatecity,
      updateUserDefault,
      setFilters
    } = this.props;
    return (
      <>
        <div className="sidebar-icon" onClick={openSideBar} />
        <div className="sidebar" onClick={openSideBar}>
          <CSSTransition
            in={opened}
            classNames="slide-in"
            unmountOnExit
            timeout={500}
          >
            <div className="sidebar-container">
              <div className="location">
                <LocationDropDown
                  updateUserDefault={updateUserDefault}
                  updatecity={updatecity}
                  city={city}
                  zipCode={zipCode}
                  updateLatAndLong={updateLatAndLong}
                  users={users}
                  currentUserId={currentUserId}
                />
              </div>
              <div className="account">
                {users.map((user, i) => {
                  if (isOpen) {
                    return (
                      <div key={i}>
                        <CurrentUser
                          id={user.id}
                          isOpen={isOpen}
                          user={user}
                          key={user.city}
                          handleInit={handleInit}
                          handleIsOpen={this.handleIsOpen}
                        />
                      </div>
                    );
                  } else {
                    if (currentUserId === user.id) {
                      return (
                        <div key={i}>
                          <CurrentUser
                            id={user.id}
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
              <div className="price-filter">
                <PriceFilter setFilters={setFilters}/>
              </div>
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
