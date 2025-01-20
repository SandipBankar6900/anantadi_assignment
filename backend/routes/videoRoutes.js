const express = require("express");
const {
  uploadVideo,
  getAllVideoByUserId,
  getVideoById,
} = require("../controllers/videoController");
const authMiddleware = require("../middleware/authMiddleware");

const videoRoute = express.Router();

videoRoute.get("/", authMiddleware, getAllVideoByUserId);
videoRoute.get("/:id", authMiddleware, getVideoById);
videoRoute.post("/upload", authMiddleware, uploadVideo);

module.exports = videoRoute;
