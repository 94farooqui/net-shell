import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const LoginPage = () => {
  const {login, setAuthLoading} = useAuth()
    const navigate = useNavigate()
    const [loading,setLoading]=useState(false)
    const [error,setError] = useState("")
  const [formData, setFormData] = useState({
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
    setLoading(true)
    console.log("Login Data:", formData); 
    try{
      const response = await axios.post("http://localhost:5000/api/auth/login", formData)
      if(response.status == 201) {
          //console.log(response.data.token)
          localStorage.setItem("net_shell_token",response.data.token)
          login(response.data.token)
          setAuthLoading(true)
          navigate("/")
      }
    }
    catch(error){
      //console.log(error)
      setError(error.response.data.message)
    }
    finally{
      setLoading(false)
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#18181b] text-white">
      <div className="bg-[#202024] p-8 rounded-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Log In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? "Loading..." :"Log In"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
