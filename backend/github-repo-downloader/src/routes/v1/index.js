const express = require("express");
const githubRepoDownloaderRoute = require("./github-repo-downloader.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/download",
    route: githubRepoDownloaderRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
