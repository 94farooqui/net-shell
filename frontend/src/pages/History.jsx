import { Trash2, Clock } from "lucide-react";

// Sample history data (Replace with API call)
const historyData = [
  { id: 1, name: "Router-1", ipAddress: "192.168.1.1", method: "SSH-Key", lastConnected: "2025-01-28 14:32:10" },
  { id: 2, name: "Switch-3", ipAddress: "192.168.1.3", method: "Password", lastConnected: "2025-01-27 19:20:45" },
  { id: 3, name: "Firewall-A", ipAddress: "192.168.1.10", method: "SSH-Key", lastConnected: "2025-01-26 09:15:32" },
  { id: 4, name: "Server-DB", ipAddress: "192.168.2.5", method: "SSH-Key", lastConnected: "2025-01-25 21:10:22" },
];

const History = () => {
  console.log("History page loaded")
  return (
    <div className="p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Connection History</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-700 transition">
          <Trash2 size={16} /> Clear History
        </button>
      </div>

      {/* History Table */}
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-2 px-4">Host</th>
              <th className="py-2 px-4">IP Address</th>
              <th className="py-2 px-4">Method</th>
              <th className="py-2 px-4">Last Connected</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((entry) => (
              <tr key={entry.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                <td className="py-2 px-4 flex items-center gap-2">
                  <Clock size={16} className="text-yellow-400" />
                  {entry.name}
                </td>
                <td className="py-2 px-4">{entry.ipAddress}</td>
                <td className="py-2 px-4">{entry.method}</td>
                <td className="py-2 px-4">{entry.lastConnected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
