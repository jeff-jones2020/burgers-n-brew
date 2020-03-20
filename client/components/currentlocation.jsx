import React, { Component } from 'react';

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    };
    this.askForCoords = this.askForCoords.bind(this);
    this.handleGeoSuccess = this.handleGeoSuccess.bind(this);
  }

  handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    this.setState({
      latitude,
      longitude
    });
  }

  handleGeoErr() {
    /* eslint-disable no-console */
    console.log("Can't access geo location");
  }

  askForCoords() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoErr
    );
  }

  componentDidMount() {
    this.askForCoords();
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <>
        <div>{`latitude: ${latitude}`}</div>
        <div>{`longitude: ${longitude}`}</div>
      </>
    );
  }
}

export default CurrentLocation;
