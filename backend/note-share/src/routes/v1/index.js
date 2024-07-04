const express = require("express");
const authController = require("../../controllers/auth.controller");
const noteController = require("../../controllers/note.controller");
const authenticate = require("../../middlewares/authenticate");
const { isValidId } = require("../../middlewares/isValidMongoId");

const router = express.Router();

// Auth routes
router
  .post("/auth/signup", authController.register)
  .post("/auth/signin", authController.login);

// note routes
router
  .route("/notes")
  .get(authenticate, noteController.findAllItems)
  .post(authenticate, noteController.create);

router
  .route("/notes/:id")
  .get(isValidId, authenticate, noteController.findSingleItem)
  .patch(isValidId, authenticate, noteController.updateItem)
  .put(isValidId, authenticate, noteController.pinItem)
  .delete(isValidId, authenticate, noteController.removeItem);

module.exports = router;
