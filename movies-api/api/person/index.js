import express from 'express';
import { getPerson, getPopularPeople } from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
    getPopularPeople().then(popularPeople => res.status(200).send(popularPeople))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    getPerson(id)
    .then(person => res.status(200).send(person))
    .catch(next);
});

export default router;