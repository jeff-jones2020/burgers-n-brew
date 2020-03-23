import React, { Component } from 'react';

class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    setInterval(this.startTimer, 5000);
  }

  render() {
    const { imageNumber } = this.state;
    const restaurant = this.props.restaurant;
    const currentDate = new Date();
    const restaurantTags = restaurant.categories.map(category => {
      return (
        <span key={category.alias}> | {category.title}</span>
      );
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
      if (openTime[1] === '00') {
        openTime[1] = '12';
      } else if (openTime[1] > 12) {
        openTime[1] = openTime[1] - 12;
      }
      if (closeTime[1] === '00') {
        closeTime[1] = '12';
      } else if (closeTime[1] > 12) {
        closeTime[1] = closeTime[1] - 12;
      }
      const opening = `${openTime[1]}:${openTime[2]}`;
      const closing = `${closeTime[1]}:${closeTime[2]}`;
      const dayArray = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
      const dayOfWeek = dayArray[day.day];
      let openNow = null;
      if (currentDate === day.day && isOpen) {
        openNow = <span>(Open Now)</span>;
      }
      return (
        <li key={day.day}>
          <div>
            {dayOfWeek}
          </div>
          <div>
            {opening}{openMorn} - {closing}{closeMorn} {openNow}
          </div>
        </li>
      );
    });
    return (
      <>
        <div className="carousel"
          style={{ backgroundImage: `url(${restaurant.photos[imageNumber]})` }}>
          <div>{restaurant.name}</div>
          <div>{starRatings}</div>
        </div>
        <div className="restaurant-details">
          <div>
            {restaurant.price}{restaurantTags}
          </div>
          <ul>
            Hours of Operation: <br/>
            {restaurantOpen}
          </ul>
        </div>
      </>
    );
  }
}

export default DetailView;
