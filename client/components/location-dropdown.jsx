import React, { Component } from 'react';
import CurrentCity from './current-city.jsx';
import SearchCityForm from './search-city-form.jsx';
import CurrentLocation from './current-location.jsx';
import { Consumer } from '../store.jsx';

class LocationDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchHidden: true,
      searchHasOpened: false
    };

    this.toggleSearchHidden = this.toggleSearchHidden.bind(this);
  }

  toggleSearchHidden(e) {
    this.setState({
      isSearchHidden: !this.state.isSearchHidden,
      searchHasOpened: true
    });
  }

  render() {
    return (
      <>
        <Consumer>
          {({
            city,
            zipCode,
            updateLatAndLong,
            user,
            updateUserDefault,
            isSignedIn,
            updatecity
          }) => (
            <>
              <div className="d-flex current-city">
                <CurrentLocation
                  city={city}
                  updateLatAndLong={updateLatAndLong}
                  isSignedIn={isSignedIn}
                />
                {city ? (
                  <CurrentCity
                    city={city}
                    zipCode={zipCode}
                    className="ml-3"
                    toggleSearchHidden={this.toggleSearchHidden}
                  />
                ) : (
                  <div className="d-flex">
                    <span className="ml-3" onClick={this.toggleSearchHidden}>
                      &nbsp;current location
                    </span>
                  </div>
                )}
              </div>
              {user.id ? (
                <p className="default-checkbox">
                  <input
                    type="checkbox"
                    onClick={() => {
                      updateUserDefault(city);
                    }}
                  />
                  &nbsp; Default
                </p>
              ) : null}
              <SearchCityForm
                toggleSearchHidden={this.toggleSearchHidden}
                searchHasOpened={this.state.searchHasOpened}
                isHidden={this.state.isSearchHidden}
                updatecity={updatecity}
              />
            </>
          )}
        </Consumer>
      </>
    );
  }
}

export default LocationDropDown;
