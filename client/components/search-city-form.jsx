import React, { Component } from 'react';

class SearchCityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetForm() {
    this.setState({
      city: ''
    });
  }

  handleSubmit(e) {
    const { getRestaurantByCity } = this.props;
    const { city } = this.state;
    getRestaurantByCity(city);
    e.preventDefault();
    this.resetForm();
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <i className="fas fa-search"></i>
            &nbsp; <span>Search:</span>
          </div>
          <input
            type="text"
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
            placeholder="City name, CA"
          />
        </form>
      </div>
    );
  }
}
export default SearchCityForm;
