import { Plus, KeyRound, Globe, User, MessageSquare } from "lucide-react";

// Sample data (Replace with API call in real implementation)
const credentials = [
  { id: 1, cred_name: "AWS Server", username: "admin", ip_url: "192.168.1.1", comment: "Main production server" },
  { id: 2, cred_name: "Cisco Router", username: "cisco", ip_url: "10.0.0.1", comment: "Core router" },
  { id: 3, cred_name: "Firewall", username: "security", ip_url: "10.10.10.1", comment: "Perimeter firewall" },
  { id: 4, cred_name: "Dev Server", username: "developer", ip_url: "dev.example.com", comment: "Development environment" },
];

const CredentialsManager = () => {
  return (
    <div className="p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Credentials Manager</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={16} /> New Credential
        </button>
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {credentials.map((cred) => (
          <CredentialCard key={cred.id} credential={cred} />
        ))}
      </div>
    </div>
  );
};

// Credential Card Component
const CredentialCard = ({ credential }) => {
  const { cred_name, username, ip_url, comment } = credential;

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700">
      <div className="flex items-center gap-3">
        <KeyRound size={20} className="text-yellow-400" />
        <h3 className="text-lg font-semibold">{cred_name}</h3>
      </div>
      <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
        <User size={16} className="text-blue-400" /> {username}
      </div>
      <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
        <Globe size={16} className="text-green-400" /> {ip_url}
      </div>
      <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
        <MessageSquare size={16} className="text-gray-400" /> {comment}
      </div>
    </div>
  );
};

export default CredentialsManager;
