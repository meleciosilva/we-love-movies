module.exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE reviews RESTART IDENTITY CASCADE")
    .then(() => knex("movies_theaters").del())
    .then(() => knex.raw("TRUNCATE TABLE critics RESTART IDENTITY CASCADE"))
    .then(() => knex.raw("TRUNCATE TABLE movies RESTART IDENTITY CASCADE"))
    .then(() => knex.raw("TRUNCATE TABLE theaters RESTART IDENTITY CASCADE"))
};
