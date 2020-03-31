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
    yelp_id text NOT NULL,
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
    yelp_id text NOT NULL,
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
    rating numeric
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    user_id integer NOT NULL,
    yelp_id text NOT NULL,
    rating numeric NOT NULL,
    review_text text,
    suggested_brew text,
    suggested_dish text
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
2	aind08SDF	Oyster Shooter	3
3	EFiFyj1pSVP8iEzeSo0w5Q	Budweiser	1
4	EFiFyj1pSVP8iEzeSo0w5Q	The patsy	1
5	EFiFyj1pSVP8iEzeSo0w5Q	Dragon's Milk Stout	1
6	EFiFyj1pSVP8iEzeSo0w5Q	Belching Beaver Peanut Butter Stout	1
\.


--
-- Data for Name: dish_suggestions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.dish_suggestions (suggestion_id, yelp_id, name, count) FROM stdin;
1	aind08SDF	Jalapeno Cheddar Bacon Sliders	2
2	aind08SDF	Mushroom Swiss Burger	3
3	EFiFyj1pSVP8iEzeSo0w5Q	Sloppy Joe	1
4	EFiFyj1pSVP8iEzeSo0w5Q	Pepper Jelly Cheeseburger Sliders	1
5	EFiFyj1pSVP8iEzeSo0w5Q	Double Quarter Pounder	1
6	EFiFyj1pSVP8iEzeSo0w5Q	Cheesy Tots	1
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

COPY public.restaurants (yelp_id, name, rating) FROM stdin;
0006	Pattiez	2.75
0002	Smash Burger	3.75
0003	Krusty Krab	2.75
0005	5	2.75
0000	The Laughing Burger	3.75
0001	Sloppy Joe	2.5
aind08SDF	Schmorgasboard	3.8823529411764706
EFiFyj1pSVP8iEzeSo0w5Q	Slater's 50/50 - Anaheim Hills	3.5
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reviews (review_id, user_id, yelp_id, rating, review_text, suggested_brew, suggested_dish) FROM stdin;
1	1	aind08SDF	4.5	\N	\N	\N
2	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	\N
3	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	\N
4	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	\N
12	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	\N
13	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	\N
14	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	\N
15	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	\N
16	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	\N
17	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	Jalapeno Cheddar Bacon Sliders
18	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	Jalapeno Cheddar Bacon Sliders
20	1	aind08SDF	4.5	Best burgers around! Beer to die for!	Oyster Shooter	Mushroom Swiss Burger
21	1	aind08SDF	4.5	Best burgers around! Beer to die for!	Oyster Shooter	Mushroom Swiss Burger
22	1	aind08SDF	4.5	Best burgers around! Beer to die for!	Oyster Shooter	Mushroom Swiss Burger
23	1	aind08SDF	4.5	Best burgers around! Beer to die for!	Oyster Shooter	Mushroom Swiss Burger
24	1	aind08SDF	4.5	Best burgers around! Beer to die for!	\N	\N
63	2	0000	3	\N	\N	\N
64	2	0001	3	\N	\N	\N
66	2	0002	3	\N	\N	\N
67	2	0003	3	\N	\N	\N
68	1	0003	3	\N	\N	\N
69	1	0005	3	\N	\N	\N
70	4	0003	3	\N	\N	\N
73	4	0005	3	\N	\N	\N
74	2	0005	3	\N	\N	\N
75	1	0002	5	\N	\N	\N
76	4	0002	5	\N	\N	\N
77	4	0006	5	\N	\N	\N
78	1	0006	2	\N	\N	\N
79	2	0006	2	\N	\N	\N
80	5	0006	2	\N	\N	\N
81	5	0002	2	\N	\N	\N
82	5	0003	2	\N	\N	\N
83	5	0005	2	\N	\N	\N
84	5	0000	2	\N	\N	\N
85	5	0001	2	\N	\N	\N
86	5	aind08SDF	2	\N	\N	\N
87	7	EFiFyj1pSVP8iEzeSo0w5Q	4	This place ROX!!!11!	Budweiser	Sloppy Joe
88	8	EFiFyj1pSVP8iEzeSo0w5Q	2		The patsy	Pepper Jelly Cheeseburger Sliders
89	9	EFiFyj1pSVP8iEzeSo0w5Q	3		Dragon's Milk Stout	Double Quarter Pounder
90	10	EFiFyj1pSVP8iEzeSo0w5Q	5		Belching Beaver Peanut Butter Stout	Cheesy Tots
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, email, password, name, default_latlong, default_city) FROM stdin;
1	jeff@jeff.gov	abc123	Jeff Biggz	(30,-30)	Irvine
2	jeff@jeff.me	$2b$10$PJWamFr33ffeGyhiKSbbMOB3/9uTvQu4qRm5/oH86xFT9gzBnZIga	Jeff	\N	Orange
4	burgers@brew.edu	7777777	Julio	\N	\N
5	burgers@brew.gov	7777777	Don Julio	\N	\N
6	jeff@jeff.jeff	$2b$10$.tZW8/VDahePXWJGANK.XuxTlyOi5qGIKE6INNa/JRSeM7AYXr9Mq	Jeff	\N	Orange
7	jeff1@jeff.jeff	$2b$10$NA1P0rKXsAOGqVJdDZMHvOCvkFffRn7oHXE5EhJPMu3uFV18cZLSO	Jeff	\N	Orange
8	Jeff2@jeff.jeff	$2b$10$fWLe2peteS1NzdMFyJbVfOq855V7GF45l/1FJDwBXFlQpPouF0am6	jeff	\N	Orange
9	jeff3@jeff.jeff	$2b$10$bRTp0hfMpIS09nLLeZhfBeCnxu4yQjZ3rCKnuk1xBq.YEWS6u6VPC	jeff	\N	Orange
10	jeff4@jeff.jeff	$2b$10$X4a8gBUYuqvwJK9AzOljN.pXSzkzwYB7q7u0A7KTQbQjWAdjRJPFe	Jeff	\N	Orange
\.


--
-- Name: brew_suggestions_suggestion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.brew_suggestions_suggestion_id_seq', 6, true);


--
-- Name: dish_suggestions_suggestion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dish_suggestions_suggestion_id_seq', 6, true);


--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.favorites_favorite_id_seq', 1, true);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 90, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 10, true);


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

