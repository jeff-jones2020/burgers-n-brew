import React, { Component } from 'react';

class CurrentCity extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      city: user.city,
      zipCode: user.zipCode
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
      <span>
        &nbsp; <span>{city}</span>, <span>{zipCode}</span>
      </span>
    );
  }
}

export default CurrentCity;
