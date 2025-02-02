import axios from "axios";
import { Plus, Folder, MapPin, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Sample data (Replace with API call in real implementation)
// const groups = [
//   { id: 1, name: "Data Center", description: "Main server cluster", location: "NYC", project: "Cloud Infra", devices: [1, 2, 3] },
//   { id: 2, name: "Office Network", description: "Corporate network devices", location: "San Francisco", project: "Enterprise IT", devices: [4, 5] },
//   { id: 3, name: "Security Devices", description: "Firewalls and security appliances", location: "London", project: "CyberSec", devices: [6, 7, 8, 9] },
//   { id: 4, name: "IoT Lab", description: "Smart devices and IoT testing", location: "Berlin", project: "IoT Research", devices: [10, 11] },
// ];

const Groups = () => {
  const navigate = useNavigate()
  const [groups,setGroups] = useState([])
  const [loading,setLoading] = useState(true)

  const getGroups = async () => {
    const response = await axios.get("http://localhost:5000/api/groups")
    if(response.status == 200){
      setGroups(response.data)
      setLoading(false)
    }
  }

  useEffect(()=>{
    getGroups()
  },[])


  const handleAddGroup = (e) => {
    navigate("new")
  }
  return (
    <div className="p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Groups</h1>
        <button onClick={handleAddGroup} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={16} /> New Group
        </button>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

// Group Card Component
const GroupCard = ({ group }) => {
  const { name, description, location, project, devices } = group;

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700">
      <div className="flex items-center gap-3">
        <Folder size={20} className="text-yellow-400" />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
      <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
        <MapPin size={16} className="text-green-400" /> {location}
      </div>
      <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
        <Package size={16} className="text-blue-400" /> {project}
      </div>
      <p className="text-gray-500 text-xs mt-2">Devices: {devices.length}</p>
    </div>
  );
};

export default Groups;
