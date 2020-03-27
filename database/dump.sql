--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_yelp_id_fkey;
ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_user_id_fkey;
ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_yelp_id_fkey;
ALTER TABLE ONLY public.dish_suggestions DROP CONSTRAINT dish_suggestions_yelp_id_fkey;
ALTER TABLE ONLY public.brew_suggestions DROP CONSTRAINT brew_suggestions_yelp_id_fkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
ALTER TABLE ONLY public.restaurants DROP CONSTRAINT restaurants_pkey;
ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_pkey;
ALTER TABLE ONLY public.dish_suggestions DROP CONSTRAINT dish_suggestions_pkey;
ALTER TABLE ONLY public.brew_suggestions DROP CONSTRAINT brew_suggestions_pkey;
ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
ALTER TABLE public.reviews ALTER COLUMN review_id DROP DEFAULT;
ALTER TABLE public.favorites ALTER COLUMN favorite_id DROP DEFAULT;
ALTER TABLE public.dish_suggestions ALTER COLUMN suggestion_id DROP DEFAULT;
ALTER TABLE public.brew_suggestions ALTER COLUMN suggestion_id DROP DEFAULT;
DROP SEQUENCE public.users_user_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.reviews_review_id_seq;
DROP TABLE public.reviews;
DROP TABLE public.restaurants;
DROP SEQUENCE public.favorites_favorite_id_seq;
DROP TABLE public.favorites;
DROP SEQUENCE public.dish_suggestions_suggestion_id_seq;
DROP TABLE public.dish_suggestions;
DROP SEQUENCE public.brew_suggestions_suggestion_id_seq;
DROP TABLE public.brew_suggestions;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: brew_suggestions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.brew_suggestions (
    suggestion_id integer NOT NULL,
    yelp_id text,
    name text NOT NULL,
    count integer NOT NULL
);


--
-- Name: brew_suggestions_suggestion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.brew_suggestions_suggestion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: brew_suggestions_suggestion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.brew_suggestions_suggestion_id_seq OWNED BY public.brew_suggestions.suggestion_id;


--
-- Name: dish_suggestions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dish_suggestions (
    suggestion_id integer NOT NULL,
    yelp_id text,
    name text NOT NULL,
    count integer NOT NULL
);


--
-- Name: dish_suggestions_suggestion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dish_suggestions_suggestion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dish_suggestions_suggestion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dish_suggestions_suggestion_id_seq OWNED BY public.dish_suggestions.suggestion_id;


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.favorites (
    favorite_id integer NOT NULL,
    user_id integer NOT NULL,
    yelp_id text,
    restaurant_name text NOT NULL
);


--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.favorites_favorite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.favorites_favorite_id_seq OWNED BY public.favorites.favorite_id;


--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.restaurants (
    yelp_id text NOT NULL,
    name text NOT NULL,
    default_latlong point,
    rating numeric
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    user_id integer,
    yelp_id text,
    rating numeric NOT NULL,
    review_text text,
    suggested_dish_1 text,
    suggested_dish_2 text,
    suggested_dish_3 text,
    suggested_brew_1 text,
    suggested_brew_2 text,
    suggested_brew_3 text
);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    default_latlong point,
    default_city text
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: brew_suggestions suggestion_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brew_suggestions ALTER COLUMN suggestion_id SET DEFAULT nextval('public.brew_suggestions_suggestion_id_seq'::regclass);


--
-- Name: dish_suggestions suggestion_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dish_suggestions ALTER COLUMN suggestion_id SET DEFAULT nextval('public.dish_suggestions_suggestion_id_seq'::regclass);


--
-- Name: favorites favorite_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorites ALTER COLUMN favorite_id SET DEFAULT nextval('public.favorites_favorite_id_seq'::regclass);


--
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: brew_suggestions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.brew_suggestions (suggestion_id, yelp_id, name, count) FROM stdin;
\.


--
-- Data for Name: dish_suggestions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.dish_suggestions (suggestion_id, yelp_id, name, count) FROM stdin;
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.favorites (favorite_id, user_id, yelp_id, restaurant_name) FROM stdin;
1	15	aind08SDF	The Big Cheese
\.


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.restaurants (yelp_id, name, default_latlong, rating) FROM stdin;
aind08SDF	Schmorgasboard	(-32.5235532499999991,30.3524534999999993)	4.5
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reviews (review_id, user_id, yelp_id, rating, review_text, suggested_dish_1, suggested_dish_2, suggested_dish_3, suggested_brew_1, suggested_brew_2, suggested_brew_3) FROM stdin;
1	1	aind08SDF	4.5	\N	\N	\N	\N	\N	\N	\N
2	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	\N	\N	\N	\N	\N
3	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	\N	\N	\N	\N	\N
4	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, email, password, name, default_latlong, default_city) FROM stdin;
1	jeff@jeff.gov	abc123	Jeff Biggz	(30,-30)	Irvine
\.


--
-- Name: brew_suggestions_suggestion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.brew_suggestions_suggestion_id_seq', 1, false);


--
-- Name: dish_suggestions_suggestion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dish_suggestions_suggestion_id_seq', 1, false);


--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.favorites_favorite_id_seq', 1, true);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 4, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: brew_suggestions brew_suggestions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brew_suggestions
    ADD CONSTRAINT brew_suggestions_pkey PRIMARY KEY (suggestion_id);


--
-- Name: dish_suggestions dish_suggestions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dish_suggestions
    ADD CONSTRAINT dish_suggestions_pkey PRIMARY KEY (suggestion_id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favorite_id);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (yelp_id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: brew_suggestions brew_suggestions_yelp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brew_suggestions
    ADD CONSTRAINT brew_suggestions_yelp_id_fkey FOREIGN KEY (yelp_id) REFERENCES public.restaurants(yelp_id);


--
-- Name: dish_suggestions dish_suggestions_yelp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dish_suggestions
    ADD CONSTRAINT dish_suggestions_yelp_id_fkey FOREIGN KEY (yelp_id) REFERENCES public.restaurants(yelp_id);


--
-- Name: favorites favorites_yelp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_yelp_id_fkey FOREIGN KEY (yelp_id) REFERENCES public.restaurants(yelp_id);


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: reviews reviews_yelp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_yelp_id_fkey FOREIGN KEY (yelp_id) REFERENCES public.restaurants(yelp_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

