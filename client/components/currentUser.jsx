import React from 'react';
import { Consumer } from '../store.jsx';

const CurrentUser = props => {
  const { handleIsOpen, user, isOpen } = props;
  if (isOpen) {
    return (
      <div>
        <Consumer>
          {({ handleInit }) => (
            <div
              id={user.id}
              onClick={id => {
                handleIsOpen();
                handleInit(id);
              }}
            >
              {user.name}
            </div>
          )}
        </Consumer>
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
