import axios from "axios";
import { Plus, Terminal, FileText, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommandCard from "../components/CommandCard";

// Sample data (Replace with API call in real implementation)
// const savedCommands = [
//   { id: 1, name: "Show Interfaces", command: "show interfaces", description: "Displays all interfaces on the router" },
//   { id: 2, name: "Check Routing Table", command: "show ip route", description: "Shows the current routing table" },
//   { id: 3, name: "Restart Service", command: "systemctl restart apache2", description: "Restarts the Apache service" },
//   { id: 4, name: "Ping Google", command: "ping -c 4 google.com", description: "Tests connectivity to Google" },
// ];

const token = localStorage.getItem("net_shell_token")

const SavedCommands = () => {
  const navigate = useNavigate()
  const [commands,setCommands] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] =useState("")

  useEffect(()=>{
    const getCommands = async () => {
      try{
        const response = await axios.get("http://localhost:5000/api/commands", {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })

        if(response.status == 200){
          setCommands(response.data)
        }
      }
      catch(error){
        setError("Error in fetching")
      }
      finally{
        setLoading(false)
      }
    }
    getCommands()
  },[])

  if(loading){
    return <p>Loading...</p>
  }

  if(error){
    return <p>{error}</p>
  }

  return (
    <div className="p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Saved Commands</h1>
        <button onClick={()=>navigate("new")} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={16} /> New Command
        </button>
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {commands.map((cmd) => (
          <CommandCard key={cmd._id} command={cmd} />
        ))}
      </div>
    </div>
  );
};

// Command Card Component


export default SavedCommands;
