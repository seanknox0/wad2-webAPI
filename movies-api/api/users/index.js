import express from 'express';
import User from './userModel';
import movieModel from '../movies/movieModel';
import upcomingModel from '../upcoming/upcomingModel';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', (req, res, next) => {
    User.find().then(users =>  res.status(200).json(users)).catch(next);
});

// Register OR authenticate a user
router.post('/', async (req, res, next) => {
  var regularExpression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  if (!req.body.username || !req.body.password) {
    res.status(401).json({
      success: false,
      msg: 'Please pass username and password.',
    });
  }
  if (!regularExpression.test(req.body.password)) { 
    res.status(401).json({
      success: false,
      msg: 'Password must contain at least 5 characters and contain at least one number and letter',
    });
  }
  if (req.query.action === 'register') {
    await User.create(req.body).catch(next);
    res.status(201).json({
      code: 201,
      msg: 'Successful created new user.',
    });
  } else {
    const user = await User.findByUserName(req.body.username).catch(next);
      if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.username, process.env.secret);
          // return the information including token as JSON
          res.status(200).json({
            success: true,
            token: 'BEARER ' + token,
          });
        } else {
          res.status(401).json({
            code: 401,
            msg: 'Authentication failed. Wrong password.'
          });
        
        }
      });
    }
});

// Update a user
router.put('/:id',  (req, res, next) => {
    if (req.body._id) delete req.body._id;
     User.update({
      _id: req.params.id,
    }, req.body, {
      upsert: false,
    })
    .then(user => res.json(200, user)).catch(next);
});


router.post('/:userName/favourites', async (req, res, next) => {
  const newFavourite = req.body.id;
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(newFavourite).catch(next);
  const user = await User.findByUserName(userName).catch(next);
  if (user.favourites.includes(movie._id)) {
    res.status(401).json({
      code: 401, 
      msg: 'Movie already in favourites!'
    })
  }
  else if (movie != null && user != null) {
    await user.favourites.push(movie._id);
    await user.save(); 
    res.status(201).json(user); 
  }
  else {
    res.status(401).json({
      code: 401,
      msg: 'Failed to add favourite.'
    });
  }
});

router.get('/:userName/favourites', (req, res, next) => {
  const user = req.params.userName;
  User.findByUserName(user).populate('favourites')
  .then(user => res.status(201).json(user.favourites)).catch(next);
});

router.post('/:userName/watchlater', async (req, res, next) => {
  const newWatchlater = req.body.id;
  const userName = req.params.userName;
  const movie = await upcomingModel.findByMovieDBId(newWatchlater).catch(next);
  const user = await User.findByUserName(userName).catch(next);
  if (user.watchlater.includes(movie._id)) {
    res.status(401).json({
      code: 401, 
      msg: 'Movie already in watchlater!'
    })
  }
  else if (movie != null && user != null) {
    await user.watchlater.push(movie._id);
    await user.save(); 
    res.status(201).json(user); 
  }
  else {
    res.status(401).json({
      code: 401,
      msg: 'Failed to add watchlater.'
    });
  }
});

router.get('/:userName/watchlater', (req, res, next) => {
  const user = req.params.userName;
  User.findByUserName(user).populate('watchlater')
  .then(user => res.status(201).json(user.watchlater)).catch(next);
});

export default router;