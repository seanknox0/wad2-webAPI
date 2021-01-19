import express from 'express';
import { getPerson, getPopularPeople } from '../tmdb-api';
import personModel from './personModel';

const router = express.Router();

router.get('/', (req, res, next) => {
    personModel.find().then(person => res.status(200).send(person)).catch(next);
  });

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    getPerson(id)
    .then(person => res.status(200).send(person))
    .catch(next);
});

export default router;