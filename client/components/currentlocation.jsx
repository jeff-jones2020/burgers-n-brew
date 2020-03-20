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
    const { getRestaurantByLatLong } = this.props;
    const { latitude, longitude } = this.state;
    getRestaurantByLatLong(latitude, longitude);
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
    this.askForCoords();
  }

  render() {
    return (
      <>
        <div
          onClick={e => {
            this.handleSubmit(e);
          }}
        >
          <i className="fas fa-street-view"></i>
          &nbsp; <span>CurrentLocation</span>
        </div>
      </>
    );
  }
}

export default CurrentLocation;
