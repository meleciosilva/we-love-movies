const knex = require("./../db/connection");

function list() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*", "mt.is_showing") // need to delete is_showing
    .groupBy("m.movie_id", "mt.is_showing")
    .orderBy("m.movie_id")
}

function read(movieId) {
  return knex("movies as m")
    .select("*")
    .where({ "m.movie_id": movieId })
    .first();
}

module.exports = {
  list,
  read,
}