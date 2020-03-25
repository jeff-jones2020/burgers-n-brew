import React from 'react';
import { Link } from 'react-router-dom';

class UserDropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuIsHidden: true,
      menuHasOpened: false
    };

    this.toggleMenuOpen = this.toggleMenuOpen.bind(this);
  }

  toggleMenuOpen(e) {
    this.setState({
      menuIsHidden: !this.state.menuIsHidden,
      menuHasOpened: true
    });
  }

  render() {
    const { user, signOutUser } = this.props;
    let menuHiddenClass;
    if (!this.state.menuHasOpened) menuHiddenClass = ' menu-hidden';
    else menuHiddenClass = this.state.menuIsHidden ? ' menu-hide' : ' menu-reveal';

    return (
      <>
        <div onClick={this.toggleMenuOpen}>
          <i className="far fa-user-circle account-icon"></i>
          {user.id ? (
            <>
              <span> &nbsp; {user.name}</span>
              <p onClick={signOutUser} >
                <Link to="/">SignOut</Link>
              </p>
            </>
          )
            : (
              <>
                <span>&nbsp; Guest</span>
                <p className={'user-menu' + menuHiddenClass}>
                  <Link to="/">SignUp/SignIn</Link>
                </p>
              </>
            ) }
        </div>

      </>
    );
  }

}

export default UserDropDown;
