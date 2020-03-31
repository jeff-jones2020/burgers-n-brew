import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      dish: '',
      isDishTextDisabled: false,
      brew: '',
      isBrewTextDisabled: false,
      dishSuggestions: [],
      brewSuggestions: [],
      starClicked: null
    };

    this.getSuggestions = this.getSuggestions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  getSuggestions() {
    const restaurantId = this.props.restaurant.id;
    fetch(`/api/suggestions/${restaurantId}/dish_suggestions/20`)
      .then(response => response.json())
      .then(result => {
        this.setState({
          dishSuggestions: result
        });
      })
      .catch(err => console.error(err));
    fetch(`/api/suggestions/${restaurantId}/brew_suggestions/20`)
      .then(response => response.json())
      .then(result => {
        this.setState({
          brewSuggestions: result
        });
      })
      .catch(err => console.error(err));
  }

  handleStarClick(e) {
    const num = parseInt(e.currentTarget.getAttribute('num'), 10);
    this.setState({
      starClicked: num
    });
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let isDishTextDisabled = false;
    let isBrewTextDisabled = false;
    if (e.target.getAttribute('id') === 'dish-select' && e.target.value !== '') {
      isDishTextDisabled = true;
    }
    if (e.target.getAttribute('id') === 'brew-select' && e.target.value !== '') {
      isBrewTextDisabled = true;
    }
    this.setState({
      [name]: value,
      isDishTextDisabled: isDishTextDisabled,
      isBrewTextDisabled: isBrewTextDisabled
    });
  }

  submitReview(e) {
    e.preventDefault();
    const submitBody = {
      userId: parseInt(this.props.userId, 10),
      yelpId: this.props.restaurant.id,
      yelpName: this.props.restaurant.name,
      rating: this.state.starClicked,
      reviewText: this.state.review,
      suggestedDish: this.state.dish,
      suggestedBrew: this.state.brew
    };

    fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(submitBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        this.props.history.push(`/details/:${this.props.restaurant.id}`);
      });
  }

  componentDidMount() {
    this.getSuggestions();
  }

  render() {
    const { restaurant } = this.props;
    const { review, dish, brew, starClicked, dishSuggestions, brewSuggestions } = this.state;
    const stars = [];
    let dishOptions; let brewOptions = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= starClicked) {
        stars.push(<i key={i.toString()} num={i.toString()} onClick={this.handleStarClick} className="fas fa-star fa-2x"></i>);
      } else {
        stars.push(<i key={i.toString()} num={i.toString()} onClick={this.handleStarClick} className="far fa-star fa-2x"></i>);
      }
    }

    if (dishSuggestions.length) {
      dishOptions = dishSuggestions.map((option, index) => {
        return <option key={index} value={option.name}>{option.name}</option>;
      });
    }
    if (brewSuggestions.length) {
      brewOptions = brewSuggestions.map((option, index) => {
        return <option key={index} value={option.name}>{option.name}</option>;
      });
    }

    return (
      <div className="review">
        <header>
          <p>
            <Link to={`/details/:${restaurant.id}`}>
              <i className="arrow" />
            </Link>
          </p>
          <h2 className='leave-review'>Leave Review:</h2>
          <h2 className='review-title'>{restaurant.name}</h2>
        </header>
        <main>
          <section className="rating">
            <div>
              {stars}
            </div>
          </section>
          <section>
            <div>
              <form onSubmit={this.submitReview} className="writeReview">
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
                    <label htmlFor='dish'>Choose: </label>
                    <select name='dish' id='dish-select' onChange={this.handleChange}>
                      <option value=''>--Choose a dish--</option>
                      {dishOptions}
                    </select>
                  </p>
                  <p>
                    <label>Add New: </label>
                    <input
                      type="text"
                      name="dish"
                      value={dish}
                      onChange={this.handleChange}
                      disabled={this.state.isDishTextDisabled}
                    />
                  </p>
                </div>
                <div>
                  <h5>Suggest A Brew?</h5>
                  <span>&#40;optional&#41;</span>
                </div>
                <div className="suggest">
                  <p>
                    <label htmlFor='brew'>Choose: </label>
                    <select name='brew' id='brew-select' onChange={this.handleChange}>
                      <option value=''>--Choose a brew--</option>
                      {brewOptions}
                    </select>
                  </p>
                  <p>
                    <label>Add New: </label>
                    <input
                      type="text"
                      name="brew"
                      value={brew}
                      onChange={this.handleChange}
                      disabled={this.state.isBrewTextDisabled}
                    />
                  </p>
                  <button type='submit'>Submit</button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default withRouter(ReviewPage);
