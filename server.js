const { PORT = 5000 } = process.env;

const app = require("./index");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => console.log("migrations", migrations))
  .then(() => knex.seed.run())
  .then((seeds) => {
    console.log("seeds", seeds)
    app.listen(PORT, listener);
  })
  .catch(console.error);
