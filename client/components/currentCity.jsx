import React, { Component } from 'react';

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
    const { updateUserDefault } = this.props;
    return (
      <>
        <span>
          &nbsp; <span>{city}</span>, <span>{zipCode}</span>
        </span>
        <p>
          <input
            type="checkbox"
            onClick={() => {
              updateUserDefault(city);
            }}
          />
          &nbsp; Default
        </p>
      </>
    );
  }
}

export default CurrentCity;
