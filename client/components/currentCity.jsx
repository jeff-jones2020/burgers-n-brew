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
          {city.name}
        </div>
      </div>
    );
  }
};

export default CurrentCity;
