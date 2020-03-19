import React from 'react';
import DropDown from './dropdown.jsx';
import { CSSTransition } from 'react-transition-group';

class SideBar extends React.Component {
  render() {
    const open = this.props.opened;

    return (
      <>
        <div className="sidebar-icon" onClick={this.props.openSideBar} />
        <CSSTransition
          in={open}
          classNames="appear"
          unmountOnExit
          timeout={500}
        >
          <div className="sidebar" onClick={this.props.openSideBar}>
            <CSSTransition
              in={open}
              classNames="slide-in"
              unmountOnExit
              timeout={500}>
              <div className="sidebar-container">
                <div className="location">
                  <DropDown />
                </div>
                <div className="account">
                  <div className="account-icon" />
                </div>
                <div className="price-filter">
                  <div className="filter-icon" />
                </div>
                <div className="proximity-filter">
                  <div className="filter-icon" />
                </div>
                <div className="vegetarian-filter">
                  <div className="filter-icon" />
                </div>
              </div>
            </CSSTransition>
          </div>
        </CSSTransition>
      </>
    );
  }
}

export default SideBar;
