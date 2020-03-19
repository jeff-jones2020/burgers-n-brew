import React, { Component } from 'react';
import CurrentCity from './currentCity.jsx';
import SearchCityForm from './search-city-form.jsx';

class CityDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cities: [],
      currentCityId: this.props.currentUserId
    };
    this.handleIsOpen = this.handleIsOpen.bind(this);
    this.handleInit = this.handleInit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentUserId } = this.props;
    if (this.props.currentUserId !== prevProps.currentUserId) {
      this.setState({
        currentCityId: currentUserId
      });
    }
  }

  handleInit(e) {
    const newInit = Number(e.target.id);
    this.setState({
      currentCityId: newInit
    });
  }

  handleIsOpen() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  getCity() {
    fetch('/api/city')
      .then(data => data.json())
      .then(cities => {
        this.setState({ cities });
      });
  }

  componentDidMount() {
    this.getCity();
  }

  render() {
    const { cities, isOpen, currentCityId } = this.state;
    const { getRestaurantByCity } = this.props;
    return (
      <>
        <div>
          {cities.map((city, i) => {
            if (isOpen) {
              return (
                <CurrentCity
                  id={city.id}
                  isOpen={isOpen}
                  city={city}
                  key={city.name}
                  handleInit={this.handleInit}
                  handleIsOpen={this.handleIsOpen}
                />
              );
            } else {
              if (currentCityId === city.id) {
                return (
                  <CurrentCity
                    isOpen={isOpen}
                    handleIsOpen={this.handleIsOpen}
                    city={city}
                    id={city.id}
                    key={city.name}
                  />
                );
              }
            }
          })}
        </div>
        {isOpen ? (
          <SearchCityForm getRestaurantByCity={getRestaurantByCity} />
        ) : (
          ''
        )}
      </>
    );
  }
}

export default CityDropDown;
