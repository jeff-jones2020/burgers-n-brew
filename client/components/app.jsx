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
      deals: []
    };

    this.getMatchingRestaurantDetails = this.getMatchingRestaurantDetails.bind(
      this
    );
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

  componentDidMount() {
    const tempLat = 33.6846; // hard coded latitude for Irvine for now, change to use state
    const tempLong = -117.8265; // hard coded longitude for Irvine for now, change to use state
    const queries = `latitude=${tempLat}&longitude=${tempLong}&categories=burgers&limit=50`;
    fetch('api/yelp/businesses/search/' + queries)
      .then(response => response.json())
      .then(data => {
        this.getMatchingRestaurantDetails(data.businesses);
      });
  }

  render() {
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
              <Home />
            </Route>
            <Route path="/">Not a Found</Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
