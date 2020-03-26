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
    return (
      <span onClick={this.props.toggleSearchHidden}>
        &nbsp;<span>{city}</span> <span>{zipCode}</span>
      </span>
    );
  }
}

export default CurrentCity;
