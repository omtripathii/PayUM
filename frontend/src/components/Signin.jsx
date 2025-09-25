import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Hooks/useAuth";
function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { loading, auth } = useAuth();
  function handleOnchange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        formData,
        {
          withCredentials: true, // Required for cookies
        }
      );
      //   console.log(response.data);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Signin failed");
    }
  };
  // if (loading) {
  //   return <div>Loading.......</div>;
  // }
  if (auth) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-row gap-3 justify-center mb-6">
          <div className=" max-w-1/11">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/PayU.svg/2560px-PayU.svg.png"
              alt=""
            />
          </div>
        </div>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-950 text-center mb-3">
            SignIn
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter Your Information To Login
          </p>
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="px-2 text-gray-800 font-semibold "
                htmlFor="username"
              >
                Email
              </label>
              <input
                type="email"
                name="username"
                id="email"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
                placeholder="Enter Your Email Id"
                value={formData.username}
                onChange={handleOnchange}
              />
            </div>
            <div className="mb-4">
              <label
                className="px-2 text-gray-800 font-semibold "
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
                placeholder="********"
                value={formData.password}
                onChange={handleOnchange}
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full border px-4 py-2 border-gray-200 rounded-md bg-gray-950 hover:bg-gray-800 text-amber-50 font-semibold cursor-pointer"
              >
                SignIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
