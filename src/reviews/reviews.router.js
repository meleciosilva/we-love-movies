const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("./../errors/methodNotAllowed");

router.route("/:reviewId")
  .get(controller.read) // need to delete this route
  .delete(controller.destroy)
  .put(controller.update)
  .all(methodNotAllowed)

module.exports = router;