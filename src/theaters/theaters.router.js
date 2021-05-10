const router = require("express").Router({ mergeParams: true }); // merges parameters with movies router in the event that request sent to "movies/:movieId/theaters"
const controller = require("./theaters.controller");
const methodNotAllowed = require("./../errors/methodNotAllowed");

router.route("/")
  .get(controller.list)
  .all(methodNotAllowed)

module.exports = router;