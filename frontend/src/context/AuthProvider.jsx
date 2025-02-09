import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError,setAuthError] = useState("")
  
  const getUser = async (token) => {
    try{
        //console.log("Fetchin details for", token)
        const response = await axios.get("http://localhost:5000/api/auth", {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(response.status == 200){
            setUser(response.data.user)
        }
    }
    catch(error){
        console.log("Error",error)
        setAuthError("Invalid Token")
        localStorage.removeItem("net_shell_token")
    }
    finally{
        setAuthLoading(false)
    }
    
}

  useEffect(() => {
    
    // Simulate token check (Replace with actual API call)
    const token = localStorage.getItem("net_shell_token");

    if (token) {
        //console.log("Verifying token", token)
        getUser(token)
      //setUser({ username: "User" }); // Ideally, fetch user details from API
    }
    else setAuthLoading(false)
  }, []);

  const login = (token) => {
    getUser(token)
  }

  const logout = () => {
    localStorage.removeItem("net_shell_token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser,login, logout, authLoading, setAuthLoading,authError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
