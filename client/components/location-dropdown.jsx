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
    const {
      users,
      currentUserId,
      updateLatAndLong,
      city,
      zipCode
    } = this.props;
    return (
      <>
        <div>
          <CurrentLocation updateLatAndLong={updateLatAndLong} />
          {users.map((user, i) => {
            if (currentUserId === user.id) {
              return (
                <CurrentCity
                  city={city}
                  zipCode={zipCode}
                  id={user.id}
                  user={user}
                  key={user.name}
                  handleIsOpen={this.handleIsOpen}
                />
              );
            }
          })}
        </div>
        <SearchCityForm />
      </>
    );
  }
}

export default LocationDropDown;
