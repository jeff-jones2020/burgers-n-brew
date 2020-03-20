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
    const restaurantTags = restaurant.categories.map(category => {
      return (
        <span key={category.alias}>| {category.title}</span>
      );
    });
    const restaurantOpen = restaurant.hours[0].open.map(day => {
      const openTime = day.start.match(/^([01]\d|2[0-3])([0-5]\d)$/);
      const closeTime = day.end.match(/^([01]\d|2[0-3])([0-5]\d)$/);
      if (openTime[1] === '00') {
        openTime[1] = '12';
      }
      const opening = `${openTime[1]}:${openTime[2]}`;
      const closing = `${closeTime[1]}:${closeTime[2]}`;
      let dayOfWeek;
      switch (day.day.toString()) {
        case '0':
          dayOfWeek = 'Sunday';
          break;
        case '1':
          dayOfWeek = 'Monday';
          break;
        case '2':
          dayOfWeek = 'Tuesday';
          break;
        case '3':
          dayOfWeek = 'Wednesday';
          break;
        case '4':
          dayOfWeek = 'Thursday';
          break;
        case '5':
          dayOfWeek = 'Friday';
          break;
        case '6':
          dayOfWeek = 'Saturday';
          break;
        default:
          break;
      }
      return (
        <div key={day.day}>{dayOfWeek} {opening} - {closing}</div>
      );
    });
    return (
      <div>
        <div className="carousel">
          <img src={restaurant.photos[imageNumber]}/>
          <div>{restaurant.name}</div>
        </div>
        <div>
          <div>
            {restaurant.price} | {restaurantTags}
          </div>
          <div>
            {restaurantOpen}
          </div>
          <div>
            {/* Map? */}
          </div>
        </div>
      </div>
    );
  }
}

export default DetailView;
