import React from 'react';

const DealsFeed = props => {
  function setDetailView(e) {
    props.setDetailViewCallback(e.id);
  }

  const { restaurants } = props;
  const restaurantEls = restaurants.map((restaurant, index) => {
    const flexReverser = index % 2 === 0 ? ' flex-row-reverse ' : ' ';
    return (
      <div
        key={index}
        id={restaurant.id}
        onClick={setDetailView}
        className={'d-flex' + flexReverser + 'align-items-center deal col-11 mx-auto p-0'}>
        <img src={restaurant.photos[0]}/>
        <div className='d-flex flex-column col'>
          <h5 className='mb-0'>{restaurant.name}</h5>
          <p>Spicy jalapeno bacon ipsum dolor amet dolor chislic lager.</p>
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
