import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import upcomingRouter from './api/upcoming';
import personRouter from './api/person';
import bodyParser from 'body-parser';
import genreRouter from './api/genres'
import usersRouter from './api/users';
import session from 'express-session';
import passport from './authenticate';
import {loadUsers, loadMovies, loadUpcoming, loadPerson} from './seedData'
import './db';

dotenv.config();

if (process.env.SEED_DB) {
  loadUsers();
  loadMovies();
  loadUpcoming();
  loadPerson();
}

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};

const app = express();

const port = process.env.PORT;

//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('public'));

//session middleware
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());

app.use('/api/genres', genreRouter);
app.use('/api/upcoming', upcomingRouter);
app.use('/api/person', personRouter);
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/users', usersRouter);

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});