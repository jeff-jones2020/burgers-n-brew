import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      dish: '',
      brew: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { restaurant } = this.props;
    const { review, dish, brew } = this.state;
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
                    <input type="text" />
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
                    <input type="text" />
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
