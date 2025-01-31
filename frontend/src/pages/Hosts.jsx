import axios from "axios";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import HostCard from "../components/HostCard";
import NewHost from "./NewHost";
import { useNavigate } from "react-router-dom";

// Sample data (Replace with API call in real implementation)
const hosts = [
  { id: 1, name: "Router-1", ipAddress: "10.10.1.1", type: "router", connectionMethod: "ssh-key", lastConnected: "2025-01-20" },
  { id: 2, name: "Switch-2", ipAddress: "10.10.2.1", type: "switch", connectionMethod: "password", lastConnected: "2025-01-19" },
  { id: 3, name: "Firewall", ipAddress: "10.10.3.1", type: "firewall", connectionMethod: "none", lastConnected: "2025-01-15" },
  { id: 4, name: "Linux Server", ipAddress: "10.10.4.1", type: "server", connectionMethod: "ssh-key", lastConnected: "2025-01-21" },
  { id: 5, name: "Router-1", ipAddress: "10.10.1.1", type: "router", connectionMethod: "ssh-key", lastConnected: "2025-01-20" },
  { id: 6, name: "Switch-2", ipAddress: "10.10.2.1", type: "switch", connectionMethod: "password", lastConnected: "2025-01-19" },
  { id: 7, name: "Firewall", ipAddress: "10.10.3.1", type: "firewall", connectionMethod: "none", lastConnected: "2025-01-15" },
  { id: 8, name: "Linux Server", ipAddress: "10.10.4.1", type: "server", connectionMethod: "ssh-key", lastConnected: "2025-01-21" },
  { id: 9, name: "Router-1", ipAddress: "10.10.1.1", type: "router", connectionMethod: "ssh-key", lastConnected: "2025-01-20" },
  { id: 10, name: "Switch-2", ipAddress: "10.10.2.1", type: "switch", connectionMethod: "password", lastConnected: "2025-01-19" },
  { id: 11, name: "Firewall", ipAddress: "10.10.3.1", type: "firewall", connectionMethod: "none", lastConnected: "2025-01-15" },
  { id: 12, name: "Linux Server", ipAddress: "10.10.4.1", type: "server", connectionMethod: "ssh-key", lastConnected: "2025-01-21" },
  { id: 13, name: "Router-1", ipAddress: "10.10.1.1", type: "router", connectionMethod: "ssh-key", lastConnected: "2025-01-20" },
  { id: 14, name: "Switch-2", ipAddress: "10.10.2.1", type: "switch", connectionMethod: "password", lastConnected: "2025-01-19" },
  { id: 15, name: "Firewall", ipAddress: "10.10.3.1", type: "firewall", connectionMethod: "none", lastConnected: "2025-01-15" },
  { id: 16, name: "Linux Server", ipAddress: "10.10.4.1", type: "server", connectionMethod: "ssh-key", lastConnected: "2025-01-21" },
  { id: 17, name: "Router-1", ipAddress: "10.10.1.1", type: "router", connectionMethod: "ssh-key", lastConnected: "2025-01-20" },
  { id: 18, name: "Switch-2", ipAddress: "10.10.2.1", type: "switch", connectionMethod: "password", lastConnected: "2025-01-19" },
  { id: 19, name: "Firewall", ipAddress: "10.10.3.1", type: "firewall", connectionMethod: "none", lastConnected: "2025-01-15" },
  { id: 20, name: "Linux Server", ipAddress: "10.10.4.1", type: "server", connectionMethod: "ssh-key", lastConnected: "2025-01-21" },
  { id: 21, name: "Router-1", ipAddress: "10.10.1.1", type: "router", connectionMethod: "ssh-key", lastConnected: "2025-01-20" },
  { id: 22, name: "Switch-2", ipAddress: "10.10.2.1", type: "switch", connectionMethod: "password", lastConnected: "2025-01-19" },
  { id: 23, name: "Firewall", ipAddress: "10.10.3.1", type: "firewall", connectionMethod: "none", lastConnected: "2025-01-15" },
  { id: 24, name: "Linux Server", ipAddress: "10.10.4.1", type: "server", connectionMethod: "ssh-key", lastConnected: "2025-01-21" },
];

const handleSearchInputChange = (e) => {

}

const handleSearch = (e) => {

}


const Hosts = () => {

  const navigate = useNavigate()

  const getHosts = async () => {
    const data = await axios.get("http://localhost:5000/api/hosts")
  }

  useEffect(()=>{
    getHosts()
  },[])
  return (
    <div className="p-6">
      {/* Navbar */}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Hosts</h1>
        <button onClick={()=>navigate("new")} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={16} /> New Host
        </button>
      </div>

      <div className="mb-6">
        <form className="w-full flex gap-x-4" onSubmit={handleSearch} onChange={handleSearchInputChange}>
          <input className="flex-1 p-2 rounded-md border bg-gray-800  border-gray-700 focus:outline-none focus:border-gray-500" placeholder="Enter IP or Host name" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition">Search</button>
        </form>
      </div>

      {/* Hosts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {hosts.map((host) => (
          <HostCard key={host.id} host={host} />
        ))}
      </div>
      
    </div>
  );
};



export default Hosts;
