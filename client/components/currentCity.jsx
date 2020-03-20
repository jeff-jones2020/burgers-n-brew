import React from 'react';

const CurrentCity = props => {
  const { user, handleIsOpen } = props;
  return (
    <div>
      <div>
        <i className="fas fa-map-marker-alt"></i>
        &nbsp; <span>{user.city}</span>, <span>{user.zipCode}</span>
        <p
          onClick={() => {
            handleIsOpen();
          }}
        >
          <i className="fas fa-search"></i>
          &nbsp; <span>Click Here</span>
        </p>
      </div>
    </div>
  );
};

export default CurrentCity;
