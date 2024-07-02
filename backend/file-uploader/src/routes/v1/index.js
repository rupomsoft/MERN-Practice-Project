const express = require("express");
const fileUploadRoute = require("./file-upload.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/uploads",
    route: fileUploadRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
