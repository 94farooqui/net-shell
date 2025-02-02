import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData); 
    const response = await axios.post("http://localhost:5000/api/auth/signup", formData)
    if(response.status == 201){
        navigate("/login")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#18181b] text-white">
      <div className="bg-[#202024] p-8 rounded-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-[#333] text-white rounded-md"
            required
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-[#333] text-white rounded-md"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 bg-[#333] text-white rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 py-2 rounded-md text-white font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
