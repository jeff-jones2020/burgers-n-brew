import React, { Component } from 'react';
import CurrentCity from './currentCity.jsx';
import SearchCityForm from './search-city-form.jsx';
import CurrentLocation from './currentlocation.jsx';
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
          {({ city, zipCode, updateLatAndLong, user, updateUserDefault }) => (
            <>
              <div className='d-flex current-city' onClick={this.toggleSearchHidden}>
                <CurrentLocation updateLatAndLong={updateLatAndLong} />
                {user.id ? (
                  <CurrentCity city={city} zipCode={zipCode} />
                ) : (
                  <span>&nbsp;current location</span>
                )}
              </div>
              <p className='default-checkbox'>
                <input
                  type="checkbox"
                  onClick={() => {
                    updateUserDefault(city);
                  }}
                />
                &nbsp; Default
              </p>
            </>
          )}
        </Consumer>
        <Consumer>
          {({ updatecity }) => {
            return (
              <SearchCityForm
                toggleSearchHidden={this.toggleSearchHidden}
                searchHasOpened={this.state.searchHasOpened}
                isHidden={this.state.isSearchHidden}
                updatecity={updatecity} />
            );
          }
          }
        </Consumer>
      </>
    );
  }
}

export default LocationDropDown;
