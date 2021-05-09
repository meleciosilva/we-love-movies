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
  .first()
}

function listReviews(movieId) {
  return knex("movies as m")
  .join("reviews as r", "m.movie_id", "r.movie_id")
  .join("critics as c", "r.critic_id", "c.critic_id")
  .select("r.*", "c.*")
  .where({ "m.movie_id": movieId })
  .groupBy("r.review_id", "c.critic_id")
  .orderBy("r.review_id")
}

module.exports = {
  list,
  read,
  listReviews,
}