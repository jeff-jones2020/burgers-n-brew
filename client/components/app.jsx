import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './home.jsx';
import Users from './users.jsx';
import SignUpSignIn from './signup-signin.jsx';
import DetailView from './detail-view';
import KEY from './key.jsx';
import { Provider } from '../store.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateUserDefault = city => {
      const { user } = this.state;
      fetch(`/api/home/user/${user.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city: city })
      })
        .then(data => data.json())
        .then(user => {
          this.setState({ user });
        });
    };
    this.setFilters = filterPair => {
      const key = Object.keys(filterPair)[0];
      this.setState({
        [key]: filterPair[key]
      });
    };
    this.updatecity = city => {
      this.setState({
        city
      });
    };
    this.updateLatAndLong = (latitude, longitude) => {
      this.setState({
        currentLat: latitude,
        currentLong: longitude
      });
    };
    this.state = {
      currentLat: null,
      currentLong: null,
      restaurants: [],
      deals: [],
      restaurant: null,
      user: {},
      city: null,
      zipCode: null,
      isSignedIn: false,
      updateUserDefault: this.updateUserDefault,
      currentPriceFilter: null,
      currentRadiusFilter: null,
      setFilters: this.setFilters,
      updatecity: this.updatecity,
      updateLatAndLong: this.updateLatAndLong
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
    this.fetchGoogleAPI = this.fetchGoogleAPI.bind(this);
    this.setDetailView = this.setDetailView.bind(this);
    this.signInUser = this.signInUser.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  getMatchingRestaurantDetails(restaurants, index = 0, newRestaurants = []) {
    // index = 0 means it will use 0 unless passed a different value for index
    if (newRestaurants.length === 5 || index === restaurants.length - 1) {
      // maximum 5 results to ensure we don't send too many requests
      if (newRestaurants.length === 0) {
        this.setState({
          restaurants: ['No restaurants found']
        });
      } else {
        this.setState({
          restaurants: newRestaurants
        });
      }
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
    const restaurantDetail = this.state.restaurants.filter(
      restaurant => restaurant.id === id
    );
    this.setState({ restaurant: restaurantDetail[0] });
    // add code for navigating to detail view page based on Yelp business ID
  }

  getRestaurantByLatLong(latitude, longitude) {
    let queryFilters = '';
    const { currentPriceFilter, currentRadiusFilter } = this.state;
    if (currentPriceFilter && currentPriceFilter.includes(true)) {
      queryFilters += '&price=';
      currentPriceFilter.forEach((isSelected, index) => {
        if (queryFilters[queryFilters.length - 1] !== '=' && isSelected) {
          queryFilters += ',';
        }
        if (isSelected) {
          switch (index) {
            case 0:
              queryFilters += '1';
              break;
            case 1:
              queryFilters += '2';
              break;
            case 2:
              queryFilters += '3,4'; // we will include yelp pricings of '$$$' AND '$$$$'
              break;
            default:
              console.error(
                'No price filter value was provided in query string'
              );
          }
        }
      });
    }

    if (currentRadiusFilter) {
      const metersRadius = Math.round(currentRadiusFilter * 1609.34);
      queryFilters += `&radius=${metersRadius}`;
    }

    const queries = `latitude=${latitude}&longitude=${longitude}&categories=burgers&limit=50`;
    fetch('/api/yelp/businesses/search/' + queries + queryFilters)
      .then(response => response.json())
      .then(data => {
        this.getMatchingRestaurantDetails(data.businesses);
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
    const { user } = this.state;
    const CITYNAME = user.city;
    this.fetchGoogleAPI(CITYNAME);
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

  signUp(name, city, email, pwd, pwd2) {
    if (!email.includes('@') || !email.includes('.')) {
      return false;
    } else if (pwd.length < 8) {
      return false;
    } else if (pwd !== pwd2) {
      return false;
    }
    fetch('/api/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, city, email, pwd, pwd2 })
    })
      .then(data => data.json())
      .then(user => {
        if (user[1] === true) {
          this.setState({
            user: user[0],
            isSignedIn: user[1]
          });
        }
      });
  }

  signInUser(email, password) {
    fetch('/api/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(data => data.json())
      .then(user => {
        if (user[1] === true) {
          this.setState({
            user: user[0],
            isSignedIn: user[1]
          });
        }
      });
  }

  signOutUser() {
    fetch('/api/user')
      .then(data => data.json())
      .then(user => {
        this.setState({
          currentLat: null,
          currentLong: null,
          user: user[0],
          isSignedIn: user[1],
          // city: null,
          restaurants: [],
          restaurant: null,
          zipCode: null
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      user,
      currentLat,
      currentLong,
      city,
      currentPriceFilter,
      currentRadiusFilter,
      isSignedIn
    } = this.state;
    if (isSignedIn) {
      if (prevState.user.name !== user.name) {
        this.getLatitudeAndLongitudeFromCityName();
      }
    }
    if (prevState.city !== city) {
      this.fetchGoogleAPI(city);
    }
    if (
      prevState.currentLat !== currentLat ||
      prevState.currentLong !== currentLong ||
      prevState.currentPriceFilter !== currentPriceFilter ||
      prevState.currentRadiusFilter !== currentRadiusFilter
    ) {
      if (currentLat === null || currentLong === null) {
        return false;
      }
      if (currentLat !== null && currentLong !== null) {
        this.getCityNameAndZipCodeFromLatLong(currentLat, currentLong);
      }
    }
  }

  render() {
    const { restaurants, isSignedIn } = this.state;
    return (
      <Router>
        <div>
          <nav>
            <ul className="nav-ul">
              <li className="nav-li">
                <Link to="/">SignUpSignIn</Link>
              </li>
              <li className="nav-li">
                <Link to="/home">Home</Link>
              </li>
              <li className="nav-li">
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <SignUpSignIn
                signUp={this.signUp}
                signInUser={this.signInUser}
                isSignedIn={isSignedIn}
              />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/details/:id">
              <DetailView restaurant={this.state.restaurant} />
            </Route>
            <Route exact path="/home">
              <Provider value={this.state}>
                <Home
                  setDetailView={this.setDetailView}
                  restaurants={restaurants}
                  signOutUser={this.signOutUser}
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
