const express = require("express");
const urlShortenerRoute = require("./url-shortener.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/shortening",
    route: urlShortenerRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
