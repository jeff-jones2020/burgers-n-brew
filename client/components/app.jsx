import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home.jsx';
import SignUpSignIn from './signup-signin.jsx';
import DetailView from './detail-view';
import KEY from './key.jsx';
import { Provider } from '../store.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateUserDefault = newCity => {
      const { user } = this.state;
      fetch(`/api/home/user/${user.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city: newCity })
      })
        .then(data => data.json())
        .then(user => {
          this.setState({ user });
        })
        .catch(err => console.error('There was an error retrieving the user.', err));
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
    if (newRestaurants.length === 5 || index === restaurants.length - 1) {
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
        )
        .catch(err => console.error('There was an error retrieving restaurants', err));
    } else {
      this.getMatchingRestaurantDetails(restaurants, ++index, newRestaurants);
    }
  }

  setDetailView(id) {
    const restaurantDetail = this.state.restaurants.filter(
      restaurant => restaurant.id === id
    );
    this.setState({ restaurant: restaurantDetail[0] });
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
              queryFilters += '3,4';
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
      })
      .catch(err => console.error('There was an error with the search filters.', err));
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
    if (city) {
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
        })
        .catch(err => console.error('There was an error with the location request.', err));
    }
  }

  signUp(name, city, email, pwd, pwd2) {
    const chkEmail = str => {
      const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,5}$/i;
      return !!regEmail.test(str);
    };
    const chkPwd = str => {
      const regPwd = /^(?=.*[0-9])(?=.*[!@#$%^&*()])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()]{8,16}$/;
      return !!regPwd.test(str);
    };
    if (chkEmail(email) === false) {
      return false;
    }
    if (chkPwd(pwd) === false) {
      return false;
    }
    if (pwd !== pwd2) {
      return false;
    }
    fetch('/api/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        city,
        email,
        pwd
      })
    })
      .then(data => data.json())
      .then(user => {
        if (user[1] === true) {
          this.setState({
            user: user[0],
            isSignedIn: user[1]
          });
        }
      })
      .catch(err => console.error('There was an error with signing up.', err));
  }

  signInUser(email, password) {
    if (!email.includes('@') || !email.includes('.')) {
      return false;
    } else if (password.length < 8) {
      return false;
    }
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
      })
      .catch(err => console.error('There was an error with signing in.', err));
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
          restaurants: [],
          restaurant: null,
          zipCode: null,
          city: null
        });
      })
      .catch(err => console.error('There was an error with signing out.', err));
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
      } else if (currentLat !== null && currentLong !== null) {
        this.getCityNameAndZipCodeFromLatLong(currentLat, currentLong);
      }
    }
  }

  render() {
    const { restaurants, isSignedIn } = this.state;
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <SignUpSignIn
                signUp={this.signUp}
                signInUser={this.signInUser}
                isSignedIn={isSignedIn}
              />
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
                  city={this.state.city}
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
