import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './home.jsx';
import Users from './users.jsx';
import About from './about.jsx';
import KEY from './key.jsx';
import { Provider } from '../store.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleInit = e => {
      const newInit = Number(e.target.id);
      this.setState({
        currentUserId: newInit
      });
    };
    this.updateUserDefault = city => {
      const { currentUserId } = this.state;
      fetch(`/api/user/${currentUserId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city: city })
      })
        .then(data => data.json())
        .then(data => {
          // console.log(data);
        });
    };
    this.state = {
      currentLat: null,
      currentLong: null,
      restaurants: [],
      deals: [],
      users: [],
      currentUserId: 1,
      city: null,
      zipCode: null,
      handleInit: this.handleInit,
      updateUserDefault: this.updateUserDefault
    };

    this.getMatchingRestaurantDetails = this.getMatchingRestaurantDetails.bind(
      this
    );
    this.getLatitudeAndLongitudeFromCityName = this.getLatitudeAndLongitudeFromCityName.bind(
      this
    );
    this.getCityNameAndZipCodeFromLatLong = this.getCityNameAndZipCodeFromLatLong.bind(
      this
    );
    this.updateLatAndLong = this.updateLatAndLong.bind(this);
    this.updatecity = this.updatecity.bind(this);
    this.fetchGoogleAPI = this.fetchGoogleAPI.bind(this);
  }

  updatecity(city) {
    this.setState({
      city
    });
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
      const CITYNAME = user[0].city;
      this.fetchGoogleAPI(CITYNAME);
    }
  }

  fetchGoogleAPI(city) {
    const GOOGLE_KEY = KEY();
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+CA&key=${GOOGLE_KEY}`
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

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevState, prevProps) {
    const { users, currentUserId, currentLat, currentLong, city } = this.state;
    if (prevProps.users !== users) {
      this.getLatitudeAndLongitudeFromCityName();
    }
    if (prevProps.currentUserId !== currentUserId) {
      this.getLatitudeAndLongitudeFromCityName();
    }
    if (prevProps.city !== city) {
      this.fetchGoogleAPI(city);
    }
    if (
      prevProps.currentLat !== currentLat &&
      prevProps.currentLong !== currentLong
    ) {
      this.getCityNameAndZipCodeFromLatLong(currentLat, currentLong);
    }
  }

  render() {
    const { restaurants } = this.state;
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
              <Provider value={this.state}>
                <Home
                  updatecity={this.updatecity}
                  updateLatAndLong={this.updateLatAndLong}
                  setDetailView={this.setDetailView}
                  restaurants={restaurants}
                />
              </Provider>
            </Route>
            <Route path="/">Page Not Found</Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
