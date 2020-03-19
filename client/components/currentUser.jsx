import React from 'react';

const CurrentUser = props => {
  const { handleIsOpen, handleInit, user, isOpen } = props;
  if (isOpen) {
    return (
      <div>
        <div
          id={user.id}
          onClick={id => {
            handleIsOpen();
            handleInit(id);
          }}
        >
          {user.name}
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
          <i className="far fa-user-circle"></i>
          &nbsp; <span>{user.name}</span>
        </div>
      </div>
    );
  }
};

export default CurrentUser;
