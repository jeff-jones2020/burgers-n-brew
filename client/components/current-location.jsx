import React, { Component } from 'react';

class CurrentLocation extends Component {
  constructor(props) {
    super(props);

    this.handleGeoSuccess = this.handleGeoSuccess.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGeoErr = this.handleGeoErr.bind(this);
  }

  handleSubmit(e) {
    this.askForCoords();
    e.preventDefault();
  }

  handleGeoSuccess(position) {
    const { updateLatAndLong } = this.props;
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    updateLatAndLong(latitude, longitude);
  }

  handleGeoErr() {
    console.error("Can't access geo location");
  }

  askForCoords() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoErr
    );
  }

  render() {
    const arrowPromptClass = this.props.city === null ? ' arrow-prompt' : '';
    return (
      <span
        onClick={e => {
          this.handleSubmit(e);
        }}
      >
        <i className={'fas fa-map-marker-alt geo-icon ml-1' + arrowPromptClass}></i>
      </span>
    );
  }
}

export default CurrentLocation;
