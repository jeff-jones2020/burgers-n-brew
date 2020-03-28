import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class SignUpSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      signUpName: '',
      signUpCity: '',
      signUpEmail: '',
      signUpPwd: '',
      signUpPwd2: '',
      isName: true,
      isCity: true,
      isEmail: true,
      isPwd: true,
      pwdMatch: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.routeChange = this.routeChange.bind(this);
    this.regName = /^([a-zA-Z]){2,32} ?([a-zA-Z]){0,32}$/;
    this.regCity = /^([a-zA-Z]){2,32} ?([a-zA-Z]){0,32}$/;
    this.regPwd = /^(?=.*[0-9])(?=.*[!@#$%^&*()])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()]{4,16}$/;
    this.regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,5}$/i;
  }

  routeChange() {
    const { isSignedIn } = this.props;
    let path;
    if (isSignedIn === false) {
      path = '/';
    } else {
      path = '/home';
    }
    this.props.history.push(path);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isSignedIn } = this.props;
    if (prevProps.isSignedIn !== isSignedIn) {
      this.routeChange();
    }
  }

  handleSubmit2(e) {
    const {
      signUpName,
      signUpCity,
      signUpEmail,
      signUpPwd,
      signUpPwd2
    } = this.state;
    const { signUp } = this.props;
    if (!this.regName.test(signUpName)) {
      this.setState({
        isName: false
      });
    }
    if (!this.regCity.test(signUpCity)) {
      this.setState({
        isCity: false
      });
    }
    if (!this.regEmail.test(signUpEmail)) {
      this.setState({
        isEmail: false
      });
    }
    if (!this.regPwd.test(signUpPwd)) {
      this.setState({
        isPwd: false
      });
    }
    if (signUpPwd !== signUpPwd2) {
      this.setState({
        pwdMatch: false
      });
    }
    setTimeout(() => {
      this.setState({
        isName: true,
        isCity: true,
        isEmail: true,
        isPwd: true,
        pwdMatch: true
      });
    }, 3000);
    e.preventDefault();
    signUp(signUpName, signUpCity, signUpEmail, signUpPwd, signUpPwd2);
  }

  handleSubmit1(e) {
    const { signInEmail, signInPassword } = this.state;
    const { signInUser } = this.props;
    e.preventDefault();
    signInUser(signInEmail, signInPassword);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const {
      signInEmail,
      signInPassword,
      signUpName,
      signUpCity,
      signUpEmail,
      signUpPwd,
      signUpPwd2,
      isName,
      isCity,
      isEmail,
      isPwd,
      pwdMatch
    } = this.state;

    return (
      <>
        <div id="bnb-banner" className="mb-3 header">
          <div id="banner-background" />
          <h1>Burgers N Brew</h1>
        </div>
        <div className="signForm">
          <div className="container">
            <header>
              <h3>Sign In</h3>
            </header>
            <section>
              <form>
                <div>
                  <label htmlFor="sign-in-email">Email: </label>
                  <input
                    type="email"
                    id="sign-in-email"
                    name="signInEmail"
                    value={signInEmail}
                    onChange={this.handleChange}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="sign-in-password">Password: </label>
                  <input
                    type="password"
                    id="sign-in-password"
                    name="signInPassword"
                    value={signInPassword}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={e => {
                      this.handleSubmit1(e);
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </section>
          </div>
          <div className="container">
            <header>
              <h3>Sign Up</h3>
            </header>
            <section>
              <form>
                <div>
                  <label htmlFor="sign-up-name">First Name: </label>
                  <input
                    type="text"
                    id="sign-up-name"
                    name="signUpName"
                    value={signUpName}
                    onChange={this.handleChange}
                    placeholder="Name"
                    minLength="1"
                  />
                </div>
                <p className={isName ? 'hidden' : 'red'}>
                  Please enter a first name.
                </p>
                <div>
                  <label htmlFor="sign-up-city">City: </label>
                  <input
                    type="text"
                    id="sign-up-city"
                    name="signUpCity"
                    value={signUpCity}
                    onChange={this.handleChange}
                    placeholder="City"
                    minLength="3"
                    maxLength="50"
                  />
                </div>
                <p className={isCity ? 'hidden' : 'red'}>
                  Please enter a city.
                </p>
                <div>
                  <label htmlFor="sign-up-email">Email: </label>
                  <input
                    type="email"
                    id="sign-up-email"
                    name="signUpEmail"
                    value={signUpEmail}
                    onChange={this.handleChange}
                    placeholder="Email"
                  />
                </div>
                <p className={isEmail ? 'hidden' : 'red'}>
                  Please enter a valid email.
                </p>
                <div>
                  <label htmlFor="sign-up-password-1">Password: </label>
                  <input
                    type="password"
                    id="sign-up-password-1"
                    name="signUpPwd"
                    value={signUpPwd}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label htmlFor="sign-up-password-2">Confirm Password: </label>
                  <input
                    type="password"
                    id="sign-up-password-2"
                    name="signUpPwd2"
                    value={signUpPwd2}
                    onChange={this.handleChange}
                    placeholder="Confirm Password"
                  />
                </div>
                <p className={isPwd ? 'hidden' : 'red'}>
                  Passwords require a capital letter, special character, and
                  number.
                </p>
                <p className={pwdMatch ? 'hidden' : 'red'}>
                  Passwords should match.
                </p>
                <div>
                  <button
                    type="submit"
                    onClick={e => {
                      this.handleSubmit2(e);
                    }}
                  >
                    Sign Up
                  </button>
                </div>
                <p className={isEmail ? 'hidden' : 'red'}>
                  Please enter a valid Email.
                </p>
                <p className={isPwd ? 'hidden' : 'red'}>
                  Your password must include a capital letter, number, and
                  special character.
                </p>
                <p className={pwdMatch ? 'hidden' : 'red'}>
                  Passwords should match.
                </p>
              </form>
            </section>
          </div>

          <div className="container">
            <h3>
              <Link to="/home">Continue as Guest</Link>
            </h3>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(SignUpSignIn);
