import React, { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-row gap-3 justify-center mb-6">
          <div className=" max-w-1/11">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/PayU.svg/2560px-PayU.svg.png"
              alt=""
              srcset=""
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
          <form className="w-full max-w-md">
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
              />
            </div>
            <div className="mb-4">
              <label
                className="px-2 text-gray-800 font-semibold "
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
                placeholder="Enter Your Email Id"
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
              />
            </div>
            <div className="mb-4">
              <button className="w-full border px-4 py-2 border-gray-200 rounded-md bg-gray-950 hover:bg-gray-800 text-amber-50 font-semibold cursor-pointer">
                SignUp
              </button>
            </div>
            <div className="flex flex-row justify-center gap-1">
              <p>Already have an account?</p>{" "}
              <div className="font-semibold cursor-pointer hover:text-gray-700">
                Login
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
