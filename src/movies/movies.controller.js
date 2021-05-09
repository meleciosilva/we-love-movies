const moviesService = require("./movies.service");

// Validation Middleware

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: `Movie id ${req.params.movieId} not found`
  });
}

async function list(req, res, next) {
  const data = await moviesService.list();
  const { is_showing } = req.query;
  const byResult = is_showing === "true" ? movie => movie.is_showing === true : () => true;
  res.json({ data: data.filter(byResult) });
}

function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list,
  read: [movieExists, read],
  movieExists
}