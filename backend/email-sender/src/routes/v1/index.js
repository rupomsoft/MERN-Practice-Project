const express = require("express");
const emailSenderRoute = require("./email-sender.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/email",
    route: emailSenderRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
