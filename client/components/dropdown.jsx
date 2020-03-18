import React, { Component } from 'react';
import CurrentCity from './currentCity.jsx';

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cities: [],
      init: 1
    };
    this.handleIsOpen = this.handleIsOpen.bind(this);
    this.handleInit = this.handleInit.bind(this);
  }

  handleInit(e) {
    const newInit = Number(e.target.id);
    this.setState({
      init: newInit
    });
  }

  handleIsOpen() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  getCity() {
    fetch('/api')
      .then(data => data.json())
      .then(cities => {
        this.setState({ cities });
      });
  }

  componentDidMount() {
    this.getCity();
  }

  render() {
    const { cities, isOpen, init } = this.state;
    return (
      <div>
        {cities.map((city, i) => {
          if (isOpen) {
            return (
              <CurrentCity
                id={city.id}
                init={init}
                isOpen={isOpen}
                city={city}
                key={city.name}
                handleInit={this.handleInit}
                handleIsOpen={this.handleIsOpen}
              />
            );
          } else {
            if (init === city.id) {
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
    );
  }
}

export default DropDown;
