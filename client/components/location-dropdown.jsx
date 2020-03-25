import React, { Component } from 'react';
import CurrentCity from './currentCity.jsx';
import SearchCityForm from './search-city-form.jsx';
import CurrentLocation from './currentlocation.jsx';
import { Consumer } from '../store.jsx';

class LocationDropDown extends Component {
  render() {
    return (
      <>
        <Consumer>
          {({ city, zipCode, updateLatAndLong, user }) => (
            <div className='d-flex align-items-center'>
              <CurrentLocation updateLatAndLong={updateLatAndLong} />
              {user.id ? (
                <CurrentCity city={city} zipCode={zipCode} />
              ) : (
                <span>&nbsp;current location</span>
              )}
            </div>
          )}
        </Consumer>
        <Consumer>
          {({ updatecity }) => <SearchCityForm updatecity={updatecity} />}
        </Consumer>
      </>
    );
  }
}

export default LocationDropDown;
