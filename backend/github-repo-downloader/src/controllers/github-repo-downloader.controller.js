const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const CustomError = require("../utils/CustomError"); // Adjust this import according to your project structure
const logger = require("../config/logger"); // Adjust this import according to your project structure

const downloadRepo = async (req, res, next) => {
  const { owner, repo } = req.params;

  try {
    // GitHub repository URL
    const repoUrl = `https://github.com/${owner}/${repo}.git`;

    // Generate a unique folder name based on timestamp
    const timestamp = Date.now(); // Current timestamp
    const localFolder = path.join(
      process.cwd(),
      "myRepository",
      `${repo}-${timestamp}`
    );

    // Ensure the folder exists or create it
    if (!fs.existsSync(localFolder)) {
      fs.mkdirSync(localFolder, { recursive: true });
    }

    // Command to clone the repository
    const cloneCommand = `git clone ${repoUrl} ${localFolder}`;

    // Execute the clone command
    await exec(cloneCommand);

    res
      .status(200)
      .json({ message: `Repository cloned successfully to ${localFolder}` });
  } catch (error) {
    next(error);
  }
};

module.exports = { downloadRepo };
