import React, { Component } from 'react';

class SignUpSignIn extends Component {
  render() {
    return (
      <>
        <div id="bnb-banner" className="mb-3 header">
          <div id="banner-background" />
          <h1>Burgers N Brew</h1>
        </div>
        <div>
          <div className="container">
            <header>
              <h3>Sign In</h3>
            </header>
            <section>
              <form action="">
                <p>
                  <label htmlFor="">Email: </label>
                  <input type="email" />
                </p>
                <p>
                  <label htmlFor="">Password: </label>
                  <input type="password" />
                </p>
                <button className="signBtn">Sign In</button>
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
                  <input type="text" />
                </p>
                <p>
                  <label htmlFor="">City: </label>
                  <input type="text" />
                </p>
                <p>
                  <label htmlFor="">Email: </label>
                  <input type="email" />
                </p>
                <p>
                  <label htmlFor="">Password: </label>
                  <input type="password" />
                </p>
                <p>
                  <label htmlFor="">confirm pwd: </label>
                  <input type="password" />
                </p>
                <button className="signBtn">Sign Up</button>
              </form>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default SignUpSignIn;
