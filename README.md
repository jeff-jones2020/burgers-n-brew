# burgers-n-brew

A dynamic mobile-first web application for hungry people who want to find deals on a classic combo - burgers and beer.

## Live Website

Try the application live at [https://bnb.jeff-j.me](https://bnb.jeff-j.me)

## Technologies Used

- React.js
- SASS
- Node.js
- Express.js
- Passport.js
- React Router
- PostgreSQL
- Bootstrap 4
- AWS EC2
- bcrypt 4
- Webpack 4

## Features

- User can view local restaurants
- User can view details of specific restaurants
- User can enter a location via text input
- User can allow geolocation for their current location
- User can view as a guest
- User can create an account
- User can set a default location to their account
- User can post a suggested burger
- User can post a suggested brew
- User can view top 3 suggestions of a restaurant

## Preview

![Burgers 'n' Brew](bnb.gif)

## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- PostgreSQL 10 or higher
- Express.js 4 or higher

### Getting Started

1. Clone the repository.

   ```shell
   git clone https://github.com/jeff-jones2020/burgers-n-brew
   cd burgers-n-brew
   ```

2. Install all dependencies with NPM.

   ```shell
   npm install
   ```

3. Create a database named 'bnb' in your PostgreSQL instance

4. Get an API key for Yelp Fusion. Go to https://www.yelp.com/fusion and create an account.

5. Modify the .env file to include

   ```
   PORT=port
   DEV_SERVER_PORT=port2
   DATABASE_URL=postgres://user:password@host:port/bnb
   SESSION_SECRET=secret
   SESSION_EXPIRY=28800000
   KEY=Bearer your_yelp_api_key
   ```

6. Import the bnb database to PostgreSQL.

   ```shell
   npm run db:import
   ```

7. Create a file /client/components/key.jsx with the following content:

   ```javascript
   const KEY = () => {
     return '__get an api key here__';
   };

   export default KEY;
   ```

8. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

   ```shell
   npm run dev
   ```
