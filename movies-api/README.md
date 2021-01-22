# Assignment 2 - Web API.

Name: Sean Knox - 20085088

## Features.

...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,
 
 + Feature 1 - Movie details page added which displays when a movie poster is clicked. This page displays infrmation on the movie and also shows reviews relating to the movie.
 + Feature 2 - Movie reviews section in movie details page. A table of all the reviews can be seen at the end of the page of a specific movie details page. The full review can be viewed with the link in the table.
 + Feature 3 - Upcoming movies page. This page is similar to the movies page except it shows movies that are soon to release. These movies share the same movie details and reviews features.
 + Feature 4 - Popular People page. This page displays the most popular people in the movie industry. Popularity rank is displayed on their card.
 + Feature 5 - Person details page. Displays information and an overview of the actor/actress. 
 + Feature 6 - Add to favourites. On the movies page you can add a favourite movie which is a list of the users favourite movies. This list is unique to each user and every new user created. It is not possible to add duplicates to this list also. 
 + Feature 7 - Add to watchlist/watchlater. On the upcoming page you can add a watchlist movie which is a list of the users movies they wish to watch in the future. This list is unique to each user and every new user created. It is not possible to add duplicates to this list also. 
 + Feature 8 - Write a review. When a movie is added to watchlist or favourites you can write a review. A form is displayed and a user can submit a review. These reviews are not saved.

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 

Describe getting/installing the software, perhaps:

```bat
npm init
```
+ This will prompt for information. A package.json file will be added to the project directory. 

```bat
npm install --save-dev babel-cli
npm install --save-dev babel-preset-env
```
+ Installs the babel packages needed for the app.

```bat
npm install --save-dev nodemon
```
+ Nodemon package which can monitor our files and auto-restart Node when changes are made. 

```bat
npm install dotenv --save
```
+ Dotenv a runtime dependency. 

```bat
npm install --save-dev eslint babel-eslint
npx eslint --init
```
+ install and configures eslint on the project.

```bat
npm install -s node-fetch
```
+ Installs the node-fetch package using NPM.

```bat
npm install -save mongoose
```
+ Installs mongoose in the project folder.

```bat
npm install --save passport passport-jwt jsonwebtoken bcrypt-nodejs
```
+ Installs passport, JWT and bcrypt.

## API Configuration
Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.
REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

+ Create a .gitignore and added node_modules, build, npm-debug.log, .env, .DS_Store.
+ Create a file called .babelrc to configure babel.
+ Create .env file with the following content.

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
TMDB_KEY= myTMDBkey
MONGO_DB=MongoDBConnection
SEED_DB=true
SECRET=MySecretKey
```

## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies | Gets a list of movies | N/A | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A |
| /api/movies/favourites | Get a list of users favourites | Post a movie into favourite list | N/A | N/A |
| /api/movies/{movieid}/reviews | Get all reviews for movie | N/A | N/A | N/A |
| /api/reviews/{reviewid} | Get full review for movie | N/A | N/A | N/A |
| /api/upcoming | Get a list of upcoming movies | N/A | N/A | N/A |
| /api/person | Get a list of people | N/A | N/A | N/A |
| /api/person/{personid} | Get a person | N/A | N/A | N/A |
| /api/watchlist | Get a list of users watchlist | Post a movie into watchlist | N/A | N/A |
| /api/genres | Gets a list of genres | N/A | N/A | N/A |
| /api/users | Get a list of users | create a user | N/A | N/A |
| ... | ... | ... | ... | ...

If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).


## Security and Authentication
Give details of authentication/security implemented on the API(e.g. passport/sessions). Indicate which routes are protected.

+ I have protected all routes on the app other than: signup page, login page and the welcome page. The user is required to sign in to use any of the features.
+ The app makes use of passport, JWT (json web token) and bcrypt.
+ bcrypt is a hash and salt feature which hashes the passwords before they are stored. The passwords are being encrypted and kept safe for extra security.
+ A password or a 'secret' is used to create a JWT. When registering a new user, it authenticates the user and creates a JWT using the 'secret' and signed with the username. This token is then used by the user to make further requests in the future.
+ The api/movies route uses passport. Passport is used as a middleware function that a request runs through before getting to a route of the app. 
+ A JWT Strategy was created to support passport. This strategy extracts the user from the JWT in the request and verifies if it is a valid username or not. 

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

+ Removed the calls to tmdb from my react app. Created seed data for the movies, upcoming movies and popular people. This seed data was loaded in the api app and then just like the drilldown data that was still being called from tmdb from the api app, the calls to gather this data was made in a file named movie-api.js in the react app. An example of a call is below for movie reviews. The data is being fetched by the react app from the movie-api. Calls for login, sign up and other data like favourites and watchlist were also made in the movies-api.js file.

+ React app repo - https://github.com/seanknox0/wad2-moviesApp.

~~~Javascript
export const getMovieReviews = id => {
    return fetch(
       '/api/movies/' + id + '/reviews', {headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
};

~~~

## Extra features

. . Briefly explain any non-standard features, functional or non-functional, developed for the app.  

## Independent learning.

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .  

+ Semantic UI - Used Semantic UI in the react app for a more pleasant look to the project. 
