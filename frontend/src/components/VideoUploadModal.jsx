import axios from "axios";
import React, { useContext, useState } from "react";
import { baseURL } from "../utils/BaseURL";
import { AuthContext } from "./AuthContext";

const initialData = {
  url: "",
  title: "",
  description: "",
  tags: [],
};

const VideoUploadModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(initialData);
  const { auth } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTag = () => {
    setFormData({ ...formData, tags: [...formData.tags, ""] });
  };

  const handleTagChange = (index, value) => {
    const updatedTags = [...formData.tags];
    updatedTags[index] = value;
    setFormData({ ...formData, tags: updatedTags });
  };

  const handleRemoveTag = (index) => {
    const updatedTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: updatedTags });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseURL}/videos/upload`, formData, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("video uploaded successfully!");
        setFormData(initialData);
        onClose()
      })
      .catch((err) => {
        console.log(err);
        alert("Oops! Something went wrong while uploading video!");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-auto flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-lg font-bold mb-4">Upload Video</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Google Drive URL
            </label>
            <input
              required
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter video URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 border focus:outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 border focus:outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  required
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  className="block w-full rounded-md border-gray-300 p-2 border focus:outline-none  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={`Tag ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTag}
              className="text-indigo-600 hover:text-indigo-800 font-semibold mt-2"
            >
              Add Tag
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadModal;
