const theatersService = require("./theaters.service");

// Router-level Middleware

async function list(req, res, next) {
  try {
    const data = await theatersService.list();
    const { movieId } = req.params;
    if (!movieId) return res.json({ data }); // returns all theaters if movieId is absent

    // filters each theater's movies to determine if movie with movieId is currently showing
    let validTheaters = data.filter(theater => theater.movies.find(movie => movie.movie_id === Number(movieId) && movie.is_showing ));

    // maps through validTheaters and returns object with theater info and some specific movie info
    validTheaters = validTheaters.map(theater => {
      const movie = theater.movies.find(movie => movie.movie_id === Number(movieId) && movie.is_showing ); // finds movie with id matching movieId and is currently showing
      const { is_showing, movie_id, theater_id } = movie;
      delete theater.movies; // delete movies key - not required in final return

      return {
        ...theater,
        is_showing,
        movie_id,
        theater_id
      } 
    }) 

    res.json({ data: validTheaters })
  } catch(error) {
    next(error);
  }
}

module.exports = {
  list
};
