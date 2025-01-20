import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { baseURL } from "../utils/BaseURL";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import VideoUploadModal from "../components/VideoUploadModal";

const obj = {
  videos: [],
  Currentpage: 1,
  TotalPages: 1,
  limit: 10,
  totalVideos: 0,
};

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState(obj);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Function to get all videos
  const getAllVideo = async () => {
    try {
      const response = await axios.get(`${baseURL}/videos`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          page: data.Currentpage,
          limit: data.limit,
          search: searchTerm, // Adding search term to the request
        },
      });
      setData({
        ...data,
        videos: response.data.videos,
        TotalPages: response.data.TotalPages,
        totalVideos: response.data.totalVideos,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllVideo();
  }, [data.Currentpage, searchTerm]); // Re-fetch data on page change or search term change

  // Handle page change
  const handlePageChange = (page) => {
    setData((prevState) => ({
      ...prevState,
      Currentpage: page,
    }));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Navigate to Single Video Page
  const handleVideoClick = (id) => {
    navigate(`/video/${id}`);
  };

  // Function to generate Google Drive embed URL
  const getGoogleDriveEmbedURL = (url) => {
    const fileId = url?.split("/d/")[1]?.split("/")[0]; // Extract file ID from the Google Drive URL
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  return (
    <div>
      <VideoUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="flex justify-between m-4">
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search videos"
          className=" p-2 border border-gray-600 focus:outline-none rounded"
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="border px-4 py-2 border-blue-600 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700"
        >
          Add Video
        </button>
      </div>

      {/* Video List */}
      <div className="flex flex-wrap gap-4 justify-center">
        {data.videos.length > 0 ? (
          data.videos.map((video) => (
            <div
              onClick={() => handleVideoClick(video._id)} // Navigate on click
              key={video._id}
              className="m-2 border rounded cursor-pointer"
            >
              <iframe
                className="w-[250px] h-[150px] rounded-md"
                src={getGoogleDriveEmbedURL(video.url)}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                title={video.title}
              ></iframe>
              <div className="p-2">
                <h2 className="text-lg font-semibold">{video.title}</h2>
                <p className="text-gray-500">{video.tags.join(", ")}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(data.Currentpage - 1)}
          disabled={data.Currentpage === 1}
          className="px-4 py-2 border rounded mx-2"
        >
          Previous
        </button>
        <span>
          {data.Currentpage} of {data.TotalPages}
        </span>
        <button
          onClick={() => handlePageChange(data.Currentpage + 1)}
          disabled={data.Currentpage === data.TotalPages}
          className="px-4 py-2 border rounded mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
