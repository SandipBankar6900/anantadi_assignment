import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../utils/BaseURL";
import { AuthContext } from "../components/AuthContext";

const SingleVideo = () => {
  const { id } = useParams(); // Extract video ID from the URL
  const [video, setVideo] = useState(null);
  const { auth } = useContext(AuthContext);

  // Fetch single video based on the ID
  const getVideoDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setVideo(response.data);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  useEffect(() => {
    getVideoDetails();
  }, [id]); // Re-fetch video when the ID changes

  if (!video) return <p className="text-center mt-8">Loading...</p>; // Show loading state until the video is fetched

  // Function to generate Google Drive embed URL
  const getGoogleDriveEmbedURL = (url) => {
    const fileId = url?.split("/d/")[1]?.split("/")[0]; // Extract file ID from the Google Drive URL
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  return (
    <div className="flex flex-row items-center p-6 gap-2">
      {/* Video Display */}
      <div className="w-full max-w-[800px] mb-6">
        <iframe
          className="w-full h-[450px] rounded-md shadow-lg"
          src={getGoogleDriveEmbedURL(video.url)}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title={video.title}
        ></iframe>
      </div>

      {/* Video Details */}
      <div className="w-full max-w-[500px] bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{video.title}</h2>
        <span className="font-semibold text-gray-700">Description: </span>
        <p className="text-gray-600 mb-4">{video.description}</p>
        <span className="font-semibold text-gray-700">Tags: </span>
        <p className="text-gray-500">{video.tags.join(", ")}</p>
      </div>
    </div>
  );
};

export default SingleVideo;
