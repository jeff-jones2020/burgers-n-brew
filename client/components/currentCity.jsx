import React, { Component } from 'react';
import { Consumer } from '../store.jsx';

class CurrentCity extends Component {
  constructor(props) {
    super(props);
    const { city, zipCode } = this.props;
    this.state = {
      city: city,
      zipCode: zipCode
    };
  }

  componentDidUpdate(prevState, prevProps) {
    const { city, zipCode } = this.props;
    if (prevProps.city !== city && prevProps.zipCode !== zipCode) {
      this.setState({
        city,
        zipCode
      });
    }
  }

  render() {
    const { city, zipCode } = this.state;
    return (
      <>
        <span>
          &nbsp; <span>{city}</span>, <span>{zipCode}</span>
        </span>
        <Consumer>
          {({ updateUserDefault }) => (
            <p>
              <input
                type="checkbox"
                onClick={() => {
                  updateUserDefault(city);
                }}
              />
              &nbsp; Default
            </p>
          )}
        </Consumer>
      </>
    );
  }
}

export default CurrentCity;
