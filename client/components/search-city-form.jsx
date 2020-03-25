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
    const { updatecity } = this.props;
    const { city } = this.state;
    updatecity(city);
    e.preventDefault();
    this.resetForm();
    this.props.toggleSearchHidden();
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    let displayClass;
    if (!this.props.searchHasOpened) displayClass = 'search-hidden';
    else displayClass = this.props.isHidden ? 'search-hide' : 'search-reveal';

    return (
      <div className={displayClass}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <i className="fas fa-search search-icon mr-3"></i>
            <input
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              placeholder="City name, CA"
            />
          </div>
        </form>
      </div>
    );
  }
}
export default SearchCityForm;
