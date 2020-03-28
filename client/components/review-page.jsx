import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ReviewPage extends Component {
  render() {
    const { restaurant } = this.props;

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
          <div>
            <i className="far fa-star fa-2x"></i>
            <i className="far fa-star fa-2x"></i>
            <i className="far fa-star fa-2x"></i>
            <i className="far fa-star fa-2x"></i>
            <i className="far fa-star fa-2x"></i>
          </div>
        </header>
        <main>
          <section className="rating"></section>
          <section className="writeReview"></section>
          <section className="suggestDish"></section>
          <section className="suggestBrew"></section>
        </main>
      </div>
    );
  }
}

export default ReviewPage;
