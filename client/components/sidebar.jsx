import React from 'react';
import LocationDropDown from './location-dropdown.jsx';
import CurrentUser from './currentUser.jsx';
import PriceFilter from './price-filter.jsx';
import { CSSTransition } from 'react-transition-group';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentUserId: 1
    };
    this.handleIsOpen = this.handleIsOpen.bind(this);
    this.handleInit = this.handleInit.bind(this);
  }

  handleInit(e) {
    const newInit = Number(e.target.id);
    this.setState({
      currentUserId: newInit
    });
  }

  handleIsOpen() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
      currentCityId: 1
    });
  }

  getUser() {
    fetch('/api/user')
      .then(data => data.json())
      .then(users => {
        this.setState({ users });
      });
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { users, isOpen, currentUserId } = this.state;
    const {
      getRestaurantByCity,
      getRestaurantByLatLong,
      openSideBar,
      opened,
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
                  getRestaurantByLatLong={getRestaurantByLatLong}
                  getRestaurantByCity={getRestaurantByCity}
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
                          handleInit={this.handleInit}
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
