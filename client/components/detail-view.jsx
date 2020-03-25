import React, { Component } from 'react';

class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null,
      imageNumber: 0
    };
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer() {
    if (this.state.imageNumber < 2) {
      this.setState({ imageNumber: this.state.imageNumber + 1 });
    } else {
      this.setState({ imageNumber: 0 });
    }
  }

  componentDidMount() {
    const intervalId = setInterval(this.startTimer, 5000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { imageNumber } = this.state;
    const restaurant = this.props.restaurant;
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const restaurantTags = restaurant.categories.map(category => {
      return <span key={category.alias}> | {category.title}</span>;
    });
    const starArray = Array(Math.floor(restaurant.rating)).fill(1);
    if (Math.floor(restaurant.rating) !== restaurant.rating) {
      starArray.push(0.5);
    }
    for (let i = starArray.length; i < 5; i++) {
      starArray.push(0);
    }
    const starRatings = starArray.map((rating, index) => {
      if (rating === 1) {
        return <i key={index} className="fas fa-star" />;
      } else if (rating === 0.5) {
        return <i key={index} className="fas fa-star-half-alt" />;
      } else {
        return <i key={index} className="far fa-star" />;
      }
    });
    const restaurantOpen = restaurant.hours[0].open.map(day => {
      const openTime = day.start.match(/^([01]\d|2[0-3])([0-5]\d)$/);
      const closeTime = day.end.match(/^([01]\d|2[0-3])([0-5]\d)$/);
      const isOpen = restaurant.hours[0].is_open_now;
      let openMorn = null;
      let closeMorn = null;
      openTime[1] = parseInt(openTime[1]);
      closeTime[1] = parseInt(closeTime[1]);
      if (openTime[1] >= 12) {
        openMorn = 'PM';
      } else {
        openMorn = 'AM';
      }
      if (closeTime[1] >= 12) {
        closeMorn = 'PM';
      } else {
        closeMorn = 'AM';
      }
      if (openTime[1] === 0) {
        openTime[1] = 12;
      } else if (openTime[1] > 12) {
        openTime[1] = openTime[1] - 12;
      }
      if (closeTime[1] === 0) {
        closeTime[1] = 12;
      } else if (closeTime[1] > 12) {
        closeTime[1] = closeTime[1] - 12;
      }
      const opening = `${openTime[1]}:${openTime[2]}`;
      const closing = `${closeTime[1]}:${closeTime[2]}`;
      const dayArray = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
      const dayOfWeek = dayArray[day.day];
      let openNow = null;
      if (currentDay === day.day && isOpen) {
        openNow = <span>(Open Now)</span>;
      }
      return (
        <li
          key={day.day}
          style={{ color: currentDay === day.day ? 'white' : 'lightslategray' }}
        >
          <div>
            {dayOfWeek} {openNow}
          </div>
          <div>
            {opening}
            {openMorn} - {closing}
            {closeMorn}
          </div>
        </li>
      );
    });
    return (
      <>
        <div
          className="carousel"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${restaurant.photos[imageNumber]})`
          }}
        >
          <div>{restaurant.name}</div>
          <div>{starRatings}</div>
        </div>
        <div className="restaurant-details">
          <div className="restaurant-tags">
            {restaurant.price}
            {restaurantTags}
          </div>
          <div className="restaurant-hours">
            <ul>{restaurantOpen}</ul>
          </div>
        </div>
      </>
    );
  }
}

export default DetailView;
