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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { updateLatAndLong } = this.props;
    const { latitude, longitude } = this.state;
    updateLatAndLong(latitude, longitude);
    e.preventDefault();
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
    const { latitude, longitude } = this.state;
    if (latitude === null && longitude === null) {
      this.askForCoords();
    }
  }

  componentWillUnmount() {
    const { latitude, longitude } = this.state;
    if (latitude === null && longitude === null) {
      this.setState({
        latitude,
        longitude
      });
    }
  }

  render() {
    return (
      <span
        onClick={e => {
          this.handleSubmit(e);
        }}
      >
        <i className="fas fa-map-marker-alt"></i>
      </span>
    );
  }
}

export default CurrentLocation;
