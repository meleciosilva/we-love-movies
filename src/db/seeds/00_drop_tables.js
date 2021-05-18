module.exports.seed = function (knex) {
  // Deletes ALL existing entries and restarts ID
  return knex.raw("TRUNCATE reviews RESTART IDENTITY CASCADE")
    .then(() => knex.raw("TRUNCATE movies_theaters RESTART IDENTITY CASCADE"))
    .then(() => knex.raw("TRUNCATE critics RESTART IDENTITY CASCADE"))
    .then(() => knex.raw("TRUNCATE movies RESTART IDENTITY CASCADE"))
    .then(() => knex.raw("TRUNCATE theaters RESTART IDENTITY CASCADE"));
};
