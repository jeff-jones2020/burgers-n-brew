import React from 'react';

const DealsFeed = props => {
  const { restaurants, setDetailView } = props;
  const restaurantEls = restaurants.map((restaurant, index) => {
    const flexReverser = index % 2 === 0 ? ' flex-row-reverse ' : ' '; // affects every other item
    if (restaurant.error) {
      return '';
    } else {
      return (
        <div
          key={index}
          id={restaurant.id}
          onClick={id => {
            setDetailView(id);
          }}
          className={
            'd-flex' +
            flexReverser +
            'align-items-center deal col-11 mx-auto p-0'
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
      );
    }
  });

  return (
    <div>
      <div>
        <h3 id="fresh-deals-title">Fresh Deals</h3>
      </div>
      {restaurantEls}
    </div>
  );
};

export default DealsFeed;
