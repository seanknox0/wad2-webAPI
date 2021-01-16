import express from 'express';
import { getUpcomingMovies } from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
    getUpcomingMovies().then(upcoming => res.status(200).send(upcoming))
    .catch(next);
});

export default router;