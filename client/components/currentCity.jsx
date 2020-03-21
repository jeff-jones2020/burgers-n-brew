import React, { Component } from 'react';

class CurrentCity extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      city: user.city,
      zipCode: user.zipCode,
      checkBox: false
    };
  }

  componentDidUpdate(prevState, prevProps) {
    const { city, zipCode } = this.props;
    if (prevProps.city !== city && prevProps.zipCode !== zipCode) {
      this.setState({
        city,
        zipCode,
        checkBox: true
      });
    }
  }

  render() {
    const { city, zipCode, checkBox } = this.state;
    if (checkBox) {
      return (
        <>
          <span>
            &nbsp; <span>{city}</span>, <span>{zipCode}</span>
          </span>
          <p>
            <input type="checkbox" />
            &nbsp; Default
          </p>
        </>
      );
    } else {
      return (
        <span>
          &nbsp; <span>{city}</span>, <span>{zipCode}</span>
        </span>
      );
    }
  }
}

export default CurrentCity;
