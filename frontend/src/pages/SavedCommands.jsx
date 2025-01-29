import { Plus, Terminal, FileText, Info } from "lucide-react";

// Sample data (Replace with API call in real implementation)
const savedCommands = [
  { id: 1, name: "Show Interfaces", command: "show interfaces", description: "Displays all interfaces on the router" },
  { id: 2, name: "Check Routing Table", command: "show ip route", description: "Shows the current routing table" },
  { id: 3, name: "Restart Service", command: "systemctl restart apache2", description: "Restarts the Apache service" },
  { id: 4, name: "Ping Google", command: "ping -c 4 google.com", description: "Tests connectivity to Google" },
];

const SavedCommands = () => {
  return (
    <div className="p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Saved Commands</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={16} /> New Command
        </button>
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {savedCommands.map((cmd) => (
          <CommandCard key={cmd.id} command={cmd} />
        ))}
      </div>
    </div>
  );
};

// Command Card Component
const CommandCard = ({ command }) => {
  const { name, command: cmdText, description } = command;

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700">
      <div className="flex items-center gap-3">
        <Terminal size={20} className="text-green-400" />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
        <FileText size={16} className="text-yellow-400" />
        <code className="bg-gray-900 px-2 py-1 rounded-md text-green-300">{cmdText}</code>
      </div>
      {description && (
        <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
          <Info size={16} className="text-blue-400" /> {description}
        </div>
      )}
    </div>
  );
};

export default SavedCommands;
