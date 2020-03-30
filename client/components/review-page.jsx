import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      dish: '',
      brew: '',
      dishSuggestions: [],
      brewSuggestions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  getSuggestions() {
    const restaurantId = this.props.restaurant.id;
    fetch(`/api/suggestions/${restaurantId}/dish_suggestions/20`)
      .then(result => {
        this.setState({
          dishSuggestions: result
        });
      })
      .catch(err => console.error(err));
    fetch(`/api/suggestions/${restaurantId}/brew_suggestions/20`)
      .then(result => {
        this.setState({
          brewSuggestions: result
        });
      })
      .catch(err => console.error(err));
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.getSuggestions();
  }

  render() {
    const { restaurant } = this.props;
    const { review, dish, brew } = this.state;

    const dishOptions = this.state.dishSuggestions.map((option, index) => {
      return <option key={index} value={option}>{option}</option>;
    });
    const brewOptions = this.state.brewSuggestions.map((option, index) => {
      return <option key={index} value={option}>{option}</option>;
    });

    return (
      <div className="review">
        <header>
          <p>
            <Link to={`/details/:${restaurant.id}`}>
              <i className="arrow" />
            </Link>
          </p>
          <h2>Leave Review:</h2>
          <h2>{restaurant.name}</h2>
        </header>
        <main>
          <section className="rating">
            <div>
              <i className="far fa-star fa-2x"></i>
              <i className="far fa-star fa-2x"></i>
              <i className="far fa-star fa-2x"></i>
              <i className="far fa-star fa-2x"></i>
              <i className="far fa-star fa-2x"></i>
            </div>
          </section>
          <section>
            <div>
              <form className="writeReview">
                <div className="title">
                  <h5>Write A Review?</h5>
                  <span>&#40;optional&#41;</span>
                </div>
                <textarea
                  name="review"
                  value={review}
                  onChange={this.handleChange}
                  id=""
                  cols="40"
                  rows="3"
                ></textarea>
                <div>
                  <h5>Suggest A Dish?</h5>
                  <span>&#40;optional&#41;</span>
                </div>
                <div className="suggest">
                  <p>
                    <label htmlFor="">Choose: </label>
                    <select name='dish-suggestions' id='dish-select'>
                      <option value=''>--Choose a dish--</option>
                      {dishOptions}
                    </select>
                  </p>
                  <p>
                    <label htmlFor="">Add New: </label>
                    <input
                      type="text"
                      name="dish"
                      value={dish}
                      onChange={this.handleChange}
                    />
                  </p>
                </div>
                <div>
                  <h5>Suggest A Brew?</h5>
                  <span>&#40;optional&#41;</span>
                </div>
                <div className="suggest">
                  <p>
                    <label htmlFor="">Choose: </label>
                    <select name='dish-suggestions' id='dish-select'>
                      <option value=''>--Choose a brew--</option>
                      {brewOptions}
                    </select>
                  </p>
                  <p>
                    <label htmlFor="">Add New: </label>
                    <input
                      type="text"
                      name="brew"
                      value={brew}
                      onChange={this.handleChange}
                    />
                  </p>
                  <button>Submit</button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default ReviewPage;
