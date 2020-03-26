CREATE SEQUENCE users_user_id_seq as integer;
CREATE TABLE users (
  user_id integer DEFAULT nextval('users_user_id_seq') PRIMARY KEY,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  name text NOT NULL,
  default_latlong point,
  default_city text
);
ALTER SEQUENCE users_user_id_seq owned by users.user_id;

INSERT INTO users (email, password, name, default_latlong, default_city)
VALUES ('jeff@jeff.gov', 'abc123', 'Jeff Biggz', '30,-30', 'Irvine');

CREATE TABLE restaurants (
  yelp_id text PRIMARY KEY,
  name text NOT NULL,
  default_latlong point,
  rating decimal
);

INSERT INTO restaurants (yelp_id, name, default_latlong, rating)
VALUES ('aind08SDF', 'Schmorgasboard', '(-32.52355325, 30.3524535)', 4.5);

CREATE SEQUENCE favorites_favorite_id_seq as integer;
CREATE TABLE favorites (
  favorite_id integer default nextval('favorites_favorite_id_seq') PRIMARY KEY,
  user_id integer NOT NULL,
  yelp_id text REFERENCES restaurants,
  restaurant_name text NOT NULL
);
ALTER SEQUENCE favorites_favorite_id_seq owned by favorites.favorite_id;

INSERT INTO favorites (user_id, yelp_id, restaurant_name)
VALUES (15, 'aind08SDF', 'The Big Cheese');

CREATE SEQUENCE reviews_review_id_seq as integer;
CREATE TABLE reviews (
  review_id integer default nextval('reviews_review_id_seq') PRIMARY KEY,
  user_id integer REFERENCES users,
  yelp_id text REFERENCES restaurants,
  rating decimal NOT NULL,
  review_text text,
  suggested_dish_1 text,
  suggested_dish_2 text,
  suggested_dish_3 text,
  suggested_brew_1 text,
  suggested_brew_2 text,
  suggested_brew_3 text
);
ALTER SEQUENCE reviews_review_id_seq owned by reviews.review_id;

INSERT INTO reviews (
  user_id,
  yelp_id,
  rating,
  review_text,
  suggested_dish_1, suggested_dish_2, suggested_dish_3,
  suggested_brew_1, suggested_brew_2, suggested_brew_3
)
VALUES (
  1,
  'aind08SDF',
  4.5,
  null,
  null, null, null,
  null, null, null
);
