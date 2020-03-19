import React from 'react';

const DealsFeed = props => {
  const { restaurants } = props;
  const restaurantEls = restaurants.map((restaurant, index) => {
    const flexReverser = index % 2 === 0 ? ' flex-row-reverse ' : '';
    return (
      <div key={index} id={restaurant.id} className={'d-flex' + flexReverser + 'deal'}>
        <div>
          <img src={restaurant.photos[0]}/>
        </div>
        <div>
          <h5>{restaurant.name}</h5>
          <p></p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div>
        <h4>Fresh Deals</h4>
      </div>
      {restaurantEls}
    </div>
  );
};

export default DealsFeed;
