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

// Route Handlers

async function list(req, res, next) {
  try {
    const data = await moviesService.list();
    const { is_showing } = req.query;
    const byResult = is_showing === "true" ? movie => movie.is_showing === true : () => true;
    res.json({ data: data.filter(byResult) });
  } catch(error) {
      next(error)
  }
}

function read(req, res, next) {
  const { movie_id: id, title, runtime_in_minutes, rating, description, image_url } = res.locals.movie;
  res.json({ data: { id, title, runtime_in_minutes, rating, description, image_url } });
}

async function listReviews(req, res, next) {
  try {
    const reviews = await moviesService.listReviews(req.params.movieId);
    const mappedReviews = reviews.map((review, index) => {
      const { review_id, content, score, critic_id, movie_id, surname, preferred_name, organization_name } = review;
      return { review_id, content, score, critic_id, movie_id, critic: { surname, critic_id, preferred_name, organization_name } };
    })
    res.json({ data: mappedReviews })
  } catch(error) {
    next(error)
  }
}


module.exports = {
  list,
  read: [movieExists, read],
  listReviews: [movieExists, listReviews],
  movieExists
}