import React, { Component } from 'react';

class SignUpSignIn extends Component {
  render() {
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
              <form action="">
                <p>
                  <label htmlFor="">Email: </label>
                  <input type="email" placeholder="Email" />
                </p>
                <p>
                  <label htmlFor="">Password: </label>
                  <input type="password" placeholder="Password" />
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
              <form action="">
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
