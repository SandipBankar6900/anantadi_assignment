const Video = require("../models/videoModel");

const uploadVideo = async (req, res) => {
  try {
    const { url, title, description, tags } = req.body;

    if ((!url, !title || !description || !tags))
      return res
        .status(404)
        .send({ error: "please provide required details!" });

    const newVideo = await Video.create({
      url,
      title,
      description,
      tags,
      userId: req.user._id,
    });
    if (!newVideo) return res.status(400).send({ error: "video not found" });
    newVideo.save();

    return res.status(200).send({ message: "video has been uploaded!" });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const getAllVideoByUserId = async (req, res) => {
  try {
    // Extract page, limit, and search term from query parameters
    const Currentpage = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || ""; // Get the search term

    // Build the query object
    const query = {
      userId: req.user._id,
      ...(search && {
        $or: [
          { title: { $regex: search, $options: "i" } }, // Search in the title (case-insensitive)
          { tags: { $regex: search, $options: "i" } }, // Search in the tags (case-insensitive)
        ],
      }),
    };

    // Fetch videos with pagination
    const allVideo = await Video.find(query)
      .skip((Currentpage - 1) * limit)
      .limit(limit);

    // Count total videos for the user
    const totalVideos = await Video.countDocuments(query);

    return res.status(200).send({
      videos: allVideo,
      totalVideos,
      Currentpage,
      limit,
      TotalPages: Math.ceil(totalVideos / limit),
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).send({ message: "Video not found" });
    }
    return res.status(200).send(video);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = { uploadVideo, getAllVideoByUserId, getVideoById };
