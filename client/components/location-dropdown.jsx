import React, { Component } from 'react';
import CurrentCity from './currentCity.jsx';
import SearchCityForm from './search-city-form.jsx';
import CurrentLocation from './currentlocation.jsx';
import { Consumer } from '../store.jsx';

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
    const { updateLatAndLong, updatecity } = this.props;
    return (
      <>
        <Consumer>
          {({ users, city, zipCode, currentUserId }) => (
            <div>
              <CurrentLocation updateLatAndLong={updateLatAndLong} />
              {users.map((user, i) => {
                if (currentUserId === user.id) {
                  return (
                    <CurrentCity
                      city={city}
                      zipCode={zipCode}
                      key={user.name}
                    />
                  );
                }
              })}
            </div>
          )}
        </Consumer>
        <SearchCityForm updatecity={updatecity} />
      </>
    );
  }
}

export default LocationDropDown;
