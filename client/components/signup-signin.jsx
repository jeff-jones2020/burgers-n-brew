import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class SignUpSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInemail: '',
      signInpassword: '',
      signUpName: '',
      signUpCity: '',
      signUpEmail: '',
      signUpPwd: '',
      signUpPwd2: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.routeChange = this.routeChange.bind(this);
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

  resetForm() {
    this.setState({
      signInemail: '',
      signInpassword: ''
    });
  }

  resetSignUpForm() {
    this.setState({
      signUpName: '',
      signUpCity: '',
      signUpEmail: '',
      signUpPwd: '',
      signUpPwd2: ''
    });
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
    signUp(signUpName, signUpCity, signUpEmail, signUpPwd, signUpPwd2);
    e.preventDefault();
    this.resetSignUpForm();
  }

  handleSubmit1(e) {
    const { signInemail, signInpassword } = this.state;
    const { signInUser } = this.props;
    e.preventDefault();
    signInUser(signInemail, signInpassword);
    this.resetForm();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const {
      signInemail,
      signInpassword,
      signUpName,
      signUpCity,
      signUpEmail,
      signUpPwd,
      signUpPwd2
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
                  <label htmlFor="">Email: </label>
                  <input
                    type="email"
                    name="signInemail"
                    value={signInemail}
                    onChange={this.handleChange}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="">Password: </label>
                  <input
                    type="password"
                    name="signInpassword"
                    value={signInpassword}
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
                  <label htmlFor="">Name: </label>
                  <input
                    type="text"
                    name="signUpName"
                    value={signUpName}
                    onChange={this.handleChange}
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label htmlFor="">City: </label>
                  <input
                    type="text"
                    name="signUpCity"
                    value={signUpCity}
                    onChange={this.handleChange}
                    placeholder="City"
                  />
                </div>
                <div>
                  <label htmlFor="">Email: </label>
                  <input
                    type="email"
                    name="signUpEmail"
                    value={signUpEmail}
                    onChange={this.handleChange}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="">Password: </label>
                  <input
                    type="password"
                    name="signUpPwd"
                    value={signUpPwd}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label htmlFor="">confirm: </label>
                  <input
                    type="password"
                    name="signUpPwd2"
                    value={signUpPwd2}
                    onChange={this.handleChange}
                    placeholder="Password again"
                  />
                </div>
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
