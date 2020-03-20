import React from 'react';

const CurrentCity = props => {
  const { user } = props;
  return (
    <span>
      &nbsp; <span>{user.city}</span>, <span>{user.zipCode}</span>
    </span>
  );
};

export default CurrentCity;
