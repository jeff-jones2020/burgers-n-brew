import React from 'react';

const DealsFeed = props => {
  const { restaurants } = props;
  const restaurantEls = restaurants.map((restaurant, index) => {
    return (
      <div key={index}>
        <div>
          <img></img>
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
      <div>
        <img src="/images/burger1.jpeg" alt="" />
        <span>Cillum laborum id voluptate qui anim</span>
      </div>
      <div>
        <span>Cillum laborum id voluptate qui anim</span>
        <img src="/images/burger1.jpeg" alt="" />
      </div>
    </div>
  );
};

export default DealsFeed;
