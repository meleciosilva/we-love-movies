const knex = require("./../db/connection");

function read(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.review_id": reviewId })
    .first();
}

function destroy(reviewId) {
  return knex("reviews as r").where({ "r.review_id": reviewId }).del();
}

function update(updatedReview) {
  return knex("reviews as r")
    .select("r.*")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview);
}

module.exports = {
  read,
  destroy,
  update,
};
