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
  }

  filterForBurgersAndBeer(restaurants) {
    const newArray = restaurants.filter(biz => {
      let hasBurger = false;
      let hasBar = false;
      for (let i = 0; i < biz.categories.length; i++) {
        if (biz.categories[i].alias.includes('burger')) {
          hasBurger = true;
        } else if (biz.categories[i].alias.includes('bars')) {
          hasBar = true;
        }
      }
      return (hasBurger && hasBar); // if both are true, add to newArray
    });
    console.log(newArray);
    return newArray;
  }

  componentDidMount() {
    const tempLat = 33.6846;
    const tempLong = -117.8265;
    const queries = `latitude=${tempLat}&longitude=${tempLong}&categories=burgers&limit=50`;
    console.log(queries);
    fetch('api/yelp/businesses/search/' + queries)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const restaurants = this.filterForBurgersAndBeer(data.businesses);
        this.setState({
          restaurants: restaurants
        });
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
