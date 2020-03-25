import React from 'react';
import { Link } from 'react-router-dom';

const DealsFeed = props => {
  const { restaurants, setDetailView } = props;
  const restaurantEls = restaurants.map((restaurant, index) => {
    const flexReverser = index % 2 === 0 ? ' flex-row-reverse ' : ' ';
    if (restaurant.error) {
      return '';
    } else {
      return (
        <div key={index}>
          <Link to={`/details/:${restaurant.id}`}>
            <div
              key={index}
              id={restaurant.id}
              onClick={() => {
                setDetailView(restaurant.id);
              }}
              className={
                'd-flex' +
                flexReverser +
                'align-items-center deal col-11 mx-auto p-0 mb-4'
              }
            >
              <img src={restaurant.photos[0]} />
              <div className="d-flex flex-column col">
                <h5 className="restaurant-name mb-0">{restaurant.name}</h5>
                <p className="deal-description">
                  Spicy jalapeno bacon ipsum dolor amet dolor chislic lager.
                </p>
              </div>
            </div>
          </Link>
        </div>
      );
    }
  });

  return (
    <div>
      <div>
        <h3 id="fresh-deals-title" className="mb-4">
          Fresh Deals
        </h3>
      </div>
      {restaurantEls}
    </div>
  );
};

export default DealsFeed;
