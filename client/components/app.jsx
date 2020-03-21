import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './home.jsx';
import Users from './users.jsx';
import About from './about.jsx';
import KEY from './key.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLat: null,
      currentLong: null,
      restaurants: [],
      deals: [],
      users: [],
      currentUserId: 1,
      city: '',
      zipCode: ''
    };

    this.getMatchingRestaurantDetails = this.getMatchingRestaurantDetails.bind(
      this
    );
    this.handleInit = this.handleInit.bind(this);
    this.getLatitudeAndLongitudeFromCityName = this.getLatitudeAndLongitudeFromCityName.bind(
      this
    );
    this.getCityNameAndZipCodeFromLatLong = this.getCityNameAndZipCodeFromLatLong.bind(
      this
    );
    this.updateLatAndLong = this.updateLatAndLong.bind(this);
  }

  updateLatAndLong(latitude, longitude) {
    this.setState({
      currentLat: latitude,
      currentLong: longitude
    });
  }

  getMatchingRestaurantDetails(restaurants, index = 0, newRestaurants = []) {
    // index = 0 means it will use 0 unless passed a different value for index
    if (newRestaurants.length === 5 || index === restaurants.length - 1) {
      // maximum 5 results to ensure we don't send too many requests
      this.setState({
        restaurants: newRestaurants
      });
      return;
    }
    let hasBurger = false;
    let hasBar = false;
    for (let k = 0; k < restaurants[index].categories.length; k++) {
      if (restaurants[index].categories[k].alias.includes('burger')) {
        hasBurger = true;
      }
      if (restaurants[index].categories[k].alias.includes('bar')) {
        hasBar = true;
      }
    }
    if (hasBurger && hasBar) {
      fetch('/api/yelp/businesses/' + restaurants[index].id)
        .then(response => response.json())
        .then(data => {
          newRestaurants.push(data);
        })
        .then(() =>
          this.getMatchingRestaurantDetails(
            restaurants,
            ++index,
            newRestaurants
          )
        );
    } else {
      this.getMatchingRestaurantDetails(restaurants, ++index, newRestaurants);
    }
  }

  setDetailView(id) {
    // add code for navigating to detail view page based on Yelp business ID
  }

  getRestaurantByLatLong(latitude, longitude) {
    const queries = `latitude=${latitude}&longitude=${longitude}&categories=burgers&limit=50`;
    fetch('api/yelp/businesses/search/' + queries)
      .then(response => response.json())
      .then(data => {
        this.getMatchingRestaurantDetails(data.businesses);
      });
  }

  getUser() {
    fetch('/api/user')
      .then(data => data.json())
      .then(users => {
        this.setState({ users });
      });
  }

  handleInit(e) {
    const newInit = Number(e.target.id);
    this.setState({
      currentUserId: newInit
    });
  }

  getCityNameAndZipCodeFromLatLong(latitude, longitude) {
    const GOOGLE_KEY = KEY();
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        const addressArr = data.results[0].formatted_address.split(',');
        this.setState(
          {
            city: addressArr[1],
            zipCode: addressArr[2]
          },
          () => {
            this.getRestaurantByLatLong(latitude, longitude);
          }
        );
      });
  }

  getLatitudeAndLongitudeFromCityName() {
    const { users, currentUserId } = this.state;
    if (users.length > 0) {
      const user = users.filter((user, i) => {
        return currentUserId === user.id;
      });
      const GOOGLE_KEY = KEY();
      const CITYNAME = user[0].city;
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${CITYNAME},+CA&key=${GOOGLE_KEY}`
      )
        .then(res => res.json())
        .then(data => {
          const currentLat = data.results[0].geometry.location.lat;
          const currentLong = data.results[0].geometry.location.lng;
          this.setState({
            currentLat,
            currentLong
          });
        });
    }
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevState, prevProps) {
    const { users, currentUserId, currentLat, currentLong } = this.state;
    if (prevProps.users !== users) {
      this.getLatitudeAndLongitudeFromCityName();
    }
    if (prevProps.currentUserId !== currentUserId) {
      this.getLatitudeAndLongitudeFromCityName();
    }
    if (
      prevProps.currentLat !== currentLat &&
      prevProps.currentLong !== currentLong
    ) {
      this.getCityNameAndZipCodeFromLatLong(currentLat, currentLong);
    }
  }

  render() {
    const {
      users,
      currentUserId,
      // currentLat,
      // currentLong,
      city,
      zipCode
    } = this.state;
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/">
              <Home
                city={city}
                zipCode={zipCode}
                updateLatAndLong={this.updateLatAndLong}
                handleInit={this.handleInit}
                users={users}
                currentUserId={currentUserId}
                getRestaurantByCity={this.getRestaurantByCity}
                setDetailView={this.setDetailView}
                restaurants={this.state.restaurants}
              />
            </Route>
            <Route path="/">Page Not Found</Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
