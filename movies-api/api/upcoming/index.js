import express from 'express';
import upcomingModel from './upcomingModel';

const router = express.Router();

router.get('/', (req, res, next) => {
    upcomingModel.find().then(upcoming => res.status(200).send(upcoming)).catch(next);
  });

export default router;