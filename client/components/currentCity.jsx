import React from 'react';

const CurrentCity = props => {
  const { handleIsOpen, handleInit, city, isOpen } = props;
  if (isOpen) {
    return (
      <div>
        <div
          id={city.id}
          onClick={id => {
            handleIsOpen();
            handleInit(id);
          }}
        >
          {city.name}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          onClick={() => {
            handleIsOpen();
          }}
        >
          <i className="fas fa-map-marker-alt"></i>
          &nbsp; <span>{city.name}</span>, <span>{city.zipCode}</span>
        </div>
      </div>
    );
  }
};

export default CurrentCity;
