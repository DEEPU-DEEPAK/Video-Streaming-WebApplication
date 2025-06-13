import express from 'express';
import { getMovieCategory, getMovieDetails, getMovieTrailers, getSimilarMovie, getTrendingMovie } from '../controllers/movie.contoller.js';

const router = express.Router();

router.get("/trending", getTrendingMovie)
router.get('/:id/trailers', getMovieTrailers);
router.get('/:id/details', getMovieDetails);
router.get('/:id/similar', getSimilarMovie);
router.get('/:category', getMovieCategory);


export default router;
