import React, { Component } from 'react';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    };
    this.askForCoords = this.askForCoords.bind(this);
    this.handleGeoSucces = this.handleGeoSucces.bind(this);
  }

  handleGeoSucces(position) {
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
      this.handleGeoSucces,
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

export default Users;
