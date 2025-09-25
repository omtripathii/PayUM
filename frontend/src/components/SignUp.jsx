import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

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
        "http://localhost:3000/api/v1/user/signup",
        formData
      );
      console.log("Signup successful:", response.data);
      toast.success(response.data.msg);
      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Signup failed");
    }
  };
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
            SignUp
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter Your Information To Create Account
          </p>
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="px-2 text-gray-800 font-semibold "
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
                placeholder="Enter Your First Name"
                value={formData.firstName}
                onChange={handleOnchange}
              />
            </div>
            <div className="mb-4">
              <label
                className="px-2 text-gray-800 font-semibold "
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
                placeholder="Enter Your Last Name"
                value={formData.lastName}
                onChange={handleOnchange}
              />
            </div>
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
                SignUp
              </button>
            </div>
            <div className="flex flex-row justify-center gap-1">
              <p>Already have an account?</p>{" "}
              <div className="font-semibold cursor-pointer hover:text-gray-700">
                <Link to="/signin"> Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
