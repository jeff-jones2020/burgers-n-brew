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
    setInterval(this.startTimer, 2000);
  }

  render() {
    const { imageNumber } = this.state;
    const restaurant = this.props.restaurant;
    const restaurantTags = restaurant.categories.map(category => {
      return (
        <span key={category.alias}>| {category.title}</span>
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
            {/* Times Open/Closed */}
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
