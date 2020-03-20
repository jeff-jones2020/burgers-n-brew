import React, { Component } from 'react';
import CityDropDown from './city-dropdown.jsx';
import CurrentUser from './currentUser.jsx';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      users: [],
      currentUserId: 1
    };
    this.handleIsOpen = this.handleIsOpen.bind(this);
    this.handleInit = this.handleInit.bind(this);
  }

  handleInit(e) {
    const newInit = Number(e.target.id);
    this.setState({
      currentUserId: newInit
    });
  }

  handleIsOpen() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
      currentCityId: 1
    });
  }

  getUser() {
    fetch('/api/user')
      .then(data => data.json())
      .then(users => {
        this.setState({ users });
      });
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { users, isOpen, currentUserId } = this.state;
    return (
      <div>
        <CityDropDown users={users} currentUserId={currentUserId} />
        {users.map((user, i) => {
          if (isOpen) {
            return (
              <div key={i}>
                <CurrentUser
                  id={user.id}
                  isOpen={isOpen}
                  user={user}
                  key={user.city}
                  handleInit={this.handleInit}
                  handleIsOpen={this.handleIsOpen}
                />
              </div>
            );
          } else {
            if (currentUserId === user.id) {
              return (
                <div key={i}>
                  <CurrentUser
                    id={user.id}
                    isOpen={isOpen}
                    user={user}
                    key={user.city}
                    handleIsOpen={this.handleIsOpen}
                  />
                </div>
              );
            }
          }
        })}
        <div id='bnb-banner' className='mb-3'>
          <div id='banner-background'></div>
          <h2 id='bnb-title'>Burgers N Brew</h2>
        </div>
      </div>
    );
  }
}

export default Header;
