
exports.up = function(knex) {
  return knex.schema.alterTable("movies", (table) => {
    table.string("description", 1000).alter();
    table.string("image_url", 1000).alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("movies", (table) => {
    table.string("description", 255).alter();
    table.string("image_url", 255).alter();
  });
};
