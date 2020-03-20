import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './home.jsx';
import Users from './users.jsx';
import About from './about.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLat: null,
      currentLong: null,
      restaurants: [],
      deals: [],
      users: [],
      currentUserId: 1
    };

    this.getMatchingRestaurantDetails = this.getMatchingRestaurantDetails.bind(
      this
    );
    this.getRestaurantByCity = this.getRestaurantByCity.bind(this);
    this.getRestaurantByLatLong = this.getRestaurantByLatLong.bind(this);
    this.handleInit = this.handleInit.bind(this);
  }

  getRestaurantByCity(city) {
    const queries = `location=${city}&categories=burgers&limit=50`;
    fetch('api/yelp/businesses/search/' + queries)
      .then(response => response.json())
      .then(data => {
        this.getMatchingRestaurantDetails(data.businesses);
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

  getRestaurantByLatLong(latitude = 33.6846, longitude = -117.8265) {
    // latitude, longitude means it will use
    // unless passed a different value for latitude, longitude
    // hard coded latitude for Irvine for now, change to use state
    // hard coded longitude for Irvine for now, change to use state
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

  getCityNameAndZipCode() {
    const KEY = 'AIzaSyA7IMKemqRAjBy6Rut55LAvHiip_ - TH_X0';
    const latitude = 33.6846;
    const longitude = -117.8265;
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY}`
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data)
      });
  }

  getLatitudeAndLongitude() {
    const KEY = 'AIzaSyA7IMKemqRAjBy6Rut55LAvHiip_ - TH_X0';
    const CITYNAME = 'la mirada';
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${CITYNAME},+CA&key=${KEY}`
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data)
      });
  }

  componentDidMount() {
    this.getRestaurantByLatLong();
    this.getUser();
  }

  render() {
    const { users, currentUserId } = this.state;
    // console.log(users);
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
                handleInit={this.handleInit}
                users={users}
                currentUserId={currentUserId}
                getRestaurantByLatLong={this.getRestaurantByLatLong}
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
