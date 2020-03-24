import React, { Component } from 'react';

class SignUpSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  signInUser(email, password) {
    fetch('/api/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(data => data.json())
      .then(data => {
        // console.log(data);
      });
  }

  handleSubmit(e) {
    const { email, password } = this.state;
    this.signInUser(email, password);
    e.preventDefault();
    this.setState({
      email: '',
      password: ''
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { email, password } = this.state;
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
              <form onSubmit={this.handleSubmit}>
                <p>
                  <label htmlFor="">Email: </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="Email"
                  />
                </p>
                <p>
                  <label htmlFor="">Password: </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </p>
                <p>
                  <button>Sign In</button>
                </p>
              </form>
            </section>
          </div>

          <div className="container">
            <header>
              <h3>Sign Up</h3>
            </header>
            <section>
              <form>
                <p>
                  <label htmlFor="">Name: </label>
                  <input type="text" placeholder="Name" />
                </p>
                <p>
                  <label htmlFor="">City: </label>
                  <input type="text" placeholder="City" />
                </p>
                <p>
                  <label htmlFor="">Email: </label>
                  <input type="email" placeholder="Email" />
                </p>
                <p>
                  <label htmlFor="">Password: </label>
                  <input type="password" placeholder="Password" />
                </p>
                <p>
                  <label htmlFor="">confirm: </label>
                  <input type="password" placeholder="Password again" />
                </p>
                <p>
                  <button>Sign Up</button>
                </p>
              </form>
            </section>
          </div>

          <div className="container">
            <form>
              <h3>
                <a href="#">Continue as Guest</a>
              </h3>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SignUpSignIn;
