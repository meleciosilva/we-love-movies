require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
// const morgan = require("morgan");

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// Application-level Middleware
// app.use(morgan("dev")); // enables request logger
app.use(cors()); // enables cors for the entire server/API
app.use(express.json()); // parses incoming requests with JSON

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

// Not Found Handler
app.use((req, res, next) => {
  next({
    status: 404,
    message: `Not found: ${req.originalUrl}`,
  });
});

// Error Handler
app.use((err, req, res, next) => {
  // console.error(err);
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ error: message });
});

module.exports = app;
