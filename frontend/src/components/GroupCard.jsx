import { Plus, Folder, MapPin, Package } from "lucide-react";

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

  export default GroupCard
  