const theatersService = require("./theaters.service");

async function movieSpecified(req, res, next) {
  const data = await theatersService.list();
  const { movieId } = req.params;
  if (movieId) {
    const validTheaters = [];
    data.filter(theater => {
      const { name, address_line_1, address_line_2, city, state, zip, created_at, updated_at } = theater;
      // returns theaters showing movie by movieId and where is_showing is true
      const validTheater = theater.movies.find(movie => movie.movie_id === Number(movieId) && movie.is_showing)
      const { theater_id, is_showing, movie_id } = validTheater;
      // pushes only showing theaters into validTheaters array with additional theater-specific information
      if (validTheater) return validTheaters.push({ theater_id, theater_id, name, address_line_1, address_line_2, city, state, zip, created_at, updated_at, is_showing, movie_id });
    })
    return res.json({ data: validTheaters })
  }
  next();
}

function list(req, res, next) {
  theatersService
    .list()
    .then(data => res.json({ data }))
    .catch(next)
}

module.exports = {
  list: [movieSpecified, list],
}