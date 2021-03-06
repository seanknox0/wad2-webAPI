import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import upcomingModel from '../api/upcoming/upcomingModel';
import personModel from '../api/person/personModel';
import {movies} from './movies.js';
import {upcoming} from './upcoming.js';
import {person} from './person.js';

const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];

export async function loadUsers() {
  console.log('load user Data');
    try {
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  };

 // deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log('load movie seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
};

 // deletes all upcoming documents in collection and inserts test data
 export async function loadUpcoming() {
  console.log('load upcoming seed data');
  console.log(upcoming.length);
  try {
    await upcomingModel.deleteMany();
    await upcomingModel.collection.insertMany(upcoming);
    console.info(`${upcoming.length} Upcoming were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load upcoming Data: ${err}`);
  }
};

// deletes all person documents in collection and inserts test data
export async function loadPerson() {
  console.log('load person seed data');
  console.log(person.length);
  try {
    await personModel.deleteMany();
    await personModel.collection.insertMany(person);
    console.info(`${person.length} Persons were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load person Data: ${err}`);
  }
};