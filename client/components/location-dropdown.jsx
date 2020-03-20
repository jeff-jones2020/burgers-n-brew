import React, { Component } from 'react';
import CurrentCity from './currentCity.jsx';
import SearchCityForm from './search-city-form.jsx';
import CurrentLocation from './currentlocation.jsx';

class LocationDropDown extends Component {
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
      isOpen: !isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    const { getRestaurantByCity, users, currentUserId } = this.props;

    const location = () => {
      if (isOpen) {
        return (
          <>
            <SearchCityForm getRestaurantByCity={getRestaurantByCity} />
            <CurrentLocation />
          </>
        );
      } else {
        return '';
      }
    };

    return (
      <>
        <div>
          {users.map((user, i) => {
            if (currentUserId === user.id) {
              return (
                <CurrentCity
                  id={user.id}
                  user={user}
                  key={user.name}
                  handleIsOpen={this.handleIsOpen}
                />
              );
            }
          })}
        </div>
        {location()}
      </>
    );
  }
}

export default LocationDropDown;