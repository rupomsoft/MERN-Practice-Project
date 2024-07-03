const express = require("express");
const imageFileConverterRoute = require("./image-file-converter.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/uploads",
    route: imageFileConverterRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
