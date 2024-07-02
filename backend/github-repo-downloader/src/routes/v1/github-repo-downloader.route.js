const express = require("express");

const githubRepoDownloaderController = require("../../controllers/github-repo-downloader.controller");

const router = express.Router();

router.get("/:owner/:repo", githubRepoDownloaderController.downloadRepo);
module.exports = router;
