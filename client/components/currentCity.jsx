import React from 'react';

const CurrentCity = props => {
  const { user } = props;
  return (
    <div>
      <div>
        <i className="fas fa-map-marker-alt"></i>
        &nbsp; <span>{user.city}</span>, <span>{user.zipCode}</span>
      </div>
    </div>
  );
};

export default CurrentCity;
