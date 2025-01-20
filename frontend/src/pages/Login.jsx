import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import { baseURL } from "../utils/BaseURL";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const { auth, login, logout } = useContext(AuthContext);
  // console.log(auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    axios
      .post(`${baseURL}/auth/login`, formData)
      .then((res) => {
        setIsloading(false);
        console.log(res);
        alert("login successful!");
        login(res?.data?.token);
        navigate("/");
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err?.response?.data?.error);
        alert(err?.response?.data?.error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            disabled={isLoading ? true : false}
            type="submit"
            className={`w-full ${
              isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-4 rounded-lg  transition duration-200`}
          >
            {isLoading ? "Loading..." : " Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
