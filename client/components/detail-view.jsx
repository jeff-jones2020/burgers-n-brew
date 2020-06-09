import React, { Component } from 'react';
import KEY from './key.jsx';
import { Link } from 'react-router-dom';

class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null,
      imageNumber: 0,
      bnbRating: 1,
      suggestedDishes: [],
      suggestedBrews: []
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
    let bnbRating, suggestedDishes, suggestedBrews;
    fetch(`/api/restaurants/${this.props.restaurant.id}`)
      .then(response => response.json())
      .then(data => {
        if (data.rating) {
          bnbRating = parseFloat(data.rating);
          bnbRating = data.rating - (data.rating % 0.5);
        } else {
          bnbRating = 'Not Rated';
        }
      })
      .then(() => {
        return fetch(`/api/suggestions/${this.props.restaurant.id}/dish_suggestions/3`)
          .then(response => response.json())
          .then(data => {
            suggestedDishes = data;
            return data;
          });
      })
      .then(() => {
        return fetch(`/api/suggestions/${this.props.restaurant.id}/brew_suggestions/3`)
          .then(response => response.json())
          .then(data => {
            suggestedBrews = data;
            return data;
          });
      })
      .then(() => {
        const intervalId = setInterval(this.startTimer, 5000);
        this.setState({
          intervalId,
          bnbRating,
          suggestedDishes: suggestedDishes,
          suggestedBrews: suggestedBrews
        });
      })
      .catch(() => {
        const intervalId = setInterval(this.startTimer, 5000);
        this.setState({ intervalId });
      });

  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { imageNumber } = this.state;
    const restaurant = this.props.restaurant;
    const currentDate = new Date();
    const latitude = restaurant.coordinates.latitude;
    const longitude = restaurant.coordinates.longitude;
    const GOOGLE_KEY = KEY();
    const currentDay = currentDate.getDay();
    let mapName = restaurant.name;
    if (mapName.includes('&')) {
      mapName = mapName.replace(/&/g, '');
    }
    const restaurantTags = restaurant.categories.map(category => {
      return <span key={category.alias}> | {category.title}</span>;
    });
    const yelpStarRating = getStarArray(restaurant.rating);
    const bnbStarRating = getStarArray(this.state.bnbRating);

    const suggestedDishes = this.state.suggestedDishes.map((suggestion, index) => {
      return <div key={index} className='suggestion mb-1'>{suggestion.name}</div>;
    });
    const suggestedBrews = this.state.suggestedBrews.map((suggestion, index) => {
      return <div key={index} className='suggestion mb-1'>{suggestion.name}</div>;
    });

    const restaurantOpen = restaurant.hours[0].open.map((day, index) => {
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
          key={index}
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
      <div className="page-content">
        <div
          className="carousel"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${restaurant.photos[imageNumber]})`
          }}
        >
          <Link to="/home">
            <i className="arrow" />
          </Link>
          <div>{restaurant.name}</div>
          <div>{yelpStarRating}</div>
        </div>
        <div className="restaurant-details">
          <div className="restaurant-tags">
            {restaurant.price}
            {restaurantTags}
          </div>
          <section className='container'>
            <div className="row mb-4">
              <div className="bnb-column col-6 mx-0 pl-3 pr-0">
                <div>B&amp;B User Rating</div>
                <div id='bnb-stars'>{bnbStarRating}</div>
                <Link to={`/details/:${restaurant.id}/review`}>
                  <button>review</button>
                </Link>
                <div className='my-3 favorites'>B&amp;B Favorite Dishes</div>
                {suggestedDishes}
                <div className='my-3 favorites'>B&amp;B Favorite Brews</div>
                {suggestedBrews}
              </div>
              <div className="col-6 mx-0 pl-0 pr-3">
                <div className="restaurant-hours">
                  <ul className='px-0'>{restaurantOpen}</ul>
                </div>
              </div>
            </div>
          </section>

          <div className="google-map">
            <iframe
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_KEY}&center=${latitude},${longitude}&q=${mapName}&zoom=15`}
            ></iframe>
          </div>
        </div>
      </div>
    );
  }
}

function getStarArray(rating) {
  if (typeof rating === 'string') return rating;
  const starArray = Array(Math.floor(rating)).fill(1);
  if (Math.floor(rating) !== rating) {
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

  return starRatings;
}

export default DetailView;
