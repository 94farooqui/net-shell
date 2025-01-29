import { Plus, Server, Router, Shield, HardDrive, Globe } from "lucide-react";

// Sample data (Replace with API call in real implementation)
const hosts = [
  { id: 1, name: "Router-1", ipAddress: "10.10.1.1", type: "router", connectionMethod: "ssh-key", lastConnected: "2025-01-20" },
  { id: 2, name: "Switch-2", ipAddress: "10.10.2.1", type: "switch", connectionMethod: "password", lastConnected: "2025-01-19" },
  { id: 3, name: "Firewall", ipAddress: "10.10.3.1", type: "firewall", connectionMethod: "none", lastConnected: "2025-01-15" },
  { id: 4, name: "Linux Server", ipAddress: "10.10.4.1", type: "server", connectionMethod: "ssh-key", lastConnected: "2025-01-21" },
  { id: 1, name: "Router-1", ipAddress: "10.10.1.1", type: "router", connectionMethod: "ssh-key", lastConnected: "2025-01-20" },
  { id: 2, name: "Switch-2", ipAddress: "10.10.2.1", type: "switch", connectionMethod: "password", lastConnected: "2025-01-19" },
  { id: 3, name: "Firewall", ipAddress: "10.10.3.1", type: "firewall", connectionMethod: "none", lastConnected: "2025-01-15" },
  { id: 4, name: "Linux Server", ipAddress: "10.10.4.1", type: "server", connectionMethod: "ssh-key", lastConnected: "2025-01-21" },
  { id: 1, name: "Router-1", ipAddress: "10.10.1.1", type: "router", connectionMethod: "ssh-key", lastConnected: "2025-01-20" },
  { id: 2, name: "Switch-2", ipAddress: "10.10.2.1", type: "switch", connectionMethod: "password", lastConnected: "2025-01-19" },
  { id: 3, name: "Firewall", ipAddress: "10.10.3.1", type: "firewall", connectionMethod: "none", lastConnected: "2025-01-15" },
  { id: 4, name: "Linux Server", ipAddress: "10.10.4.1", type: "server", connectionMethod: "ssh-key", lastConnected: "2025-01-21" },
  { id: 1, name: "Router-1", ipAddress: "10.10.1.1", type: "router", connectionMethod: "ssh-key", lastConnected: "2025-01-20" },
  { id: 2, name: "Switch-2", ipAddress: "10.10.2.1", type: "switch", connectionMethod: "password", lastConnected: "2025-01-19" },
  { id: 3, name: "Firewall", ipAddress: "10.10.3.1", type: "firewall", connectionMethod: "none", lastConnected: "2025-01-15" },
  { id: 4, name: "Linux Server", ipAddress: "10.10.4.1", type: "server", connectionMethod: "ssh-key", lastConnected: "2025-01-21" },
  { id: 1, name: "Router-1", ipAddress: "10.10.1.1", type: "router", connectionMethod: "ssh-key", lastConnected: "2025-01-20" },
  { id: 2, name: "Switch-2", ipAddress: "10.10.2.1", type: "switch", connectionMethod: "password", lastConnected: "2025-01-19" },
  { id: 3, name: "Firewall", ipAddress: "10.10.3.1", type: "firewall", connectionMethod: "none", lastConnected: "2025-01-15" },
  { id: 4, name: "Linux Server", ipAddress: "10.10.4.1", type: "server", connectionMethod: "ssh-key", lastConnected: "2025-01-21" },
  { id: 1, name: "Router-1", ipAddress: "10.10.1.1", type: "router", connectionMethod: "ssh-key", lastConnected: "2025-01-20" },
  { id: 2, name: "Switch-2", ipAddress: "10.10.2.1", type: "switch", connectionMethod: "password", lastConnected: "2025-01-19" },
  { id: 3, name: "Firewall", ipAddress: "10.10.3.1", type: "firewall", connectionMethod: "none", lastConnected: "2025-01-15" },
  { id: 4, name: "Linux Server", ipAddress: "10.10.4.1", type: "server", connectionMethod: "ssh-key", lastConnected: "2025-01-21" },
];

const handleSearchInputChange = (e) => {

}

const handleSearch = (e) => {

}


const Hosts = () => {
  return (
    <div className="p-6">
      {/* Navbar */}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Hosts</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition">
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

// Host Card Component
const HostCard = ({ host }) => {
  const { name, ipAddress, type, connectionMethod, lastConnected } = host;

  // Icons for different device types
  const typeIcons = {
    router: <Router size={20} className="text-green-400" />,
    switch: <Globe size={20} className="text-blue-400" />,
    firewall: <Shield size={20} className="text-red-400" />,
    server: <Server size={20} className="text-yellow-400" />,
    other: <HardDrive size={20} className="text-gray-400" />,
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700">
      <div className="flex items-center gap-3">
        {typeIcons[type] || typeIcons.other}
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <p className="text-gray-400 text-sm mt-1">{ipAddress}</p>
      <p className="text-gray-300 text-sm mt-1">Connection: {connectionMethod}</p>
      {lastConnected && <p className="text-gray-500 text-xs mt-2">Last Connected: {lastConnected}</p>}
    </div>
  );
};

export default Hosts;
