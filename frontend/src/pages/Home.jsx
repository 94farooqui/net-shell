import { Plus, Server, Users, Terminal } from "lucide-react";

const Home = () => {
  // Sample Data
  const recentConnections = [
    { id: 1, name: "Server-1", ip: "192.168.1.10", status: "Active" },
    { id: 2, name: "Server-2", ip: "192.168.1.11", status: "Disconnected" },
    { id: 3, name: "Ubuntu-VM", ip: "192.168.1.12", status: "Active" },
    { id: 4, name: "Test-Machine", ip: "192.168.1.13", status: "Active" },
  ];

  const hosts = [
    { id: 1, name: "Firewall-1", ip: "10.10.1.1" },
    { id: 2, name: "Switch-2", ip: "10.10.2.1" },
    { id: 3, name: "Linux-Server", ip: "10.10.3.1" },
    { id: 4, name: "DB-Server", ip: "10.10.4.1" },
  ];

  const groups = [
    { id: 1, name: "Production Servers", count: 5 },
    { id: 2, name: "Development Machines", count: 3 },
    { id: 3, name: "Testing Environment", count: 4 },
    { id: 4, name: "Backup Systems", count: 2 },
  ];

  return (
    <div className="p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={16} /> New Connection
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {/* Recent SSH Connections */}
        <Section title="Recent SSH Connections" icon={<Terminal size={20} />}>
          {recentConnections.map((conn) => (
            <Card key={conn.id} title={conn.name} subtitle={conn.ip} status={conn.status} />
          ))}
        </Section>

        {/* Hosts */}
        <Section title="Hosts" icon={<Server size={20} />}>
          {hosts.map((host) => (
            <Card key={host.id} title={host.name} subtitle={host.ip} />
          ))}
        </Section>

        {/* Groups */}
        <Section title="Groups" icon={<Users size={20} />}>
          {groups.map((group) => (
            <Card key={group.id} title={group.name} subtitle={`${group.count} Hosts`} />
          ))}
        </Section>
      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, children, icon }) => (
  <div>
    <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">{icon} {title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{children}</div>
  </div>
);

// Card Component
const Card = ({ title, subtitle, status }) => (
  <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700">
    <h3 className="text-md font-semibold">{title}</h3>
    <p className="text-gray-400 text-sm">{subtitle}</p>
    {status && (
      <span className={`mt-2 inline-block text-xs font-medium px-2 py-1 rounded ${status === "Active" ? "bg-green-600" : "bg-red-600"}`}>
        {status}
      </span>
    )}
  </div>
);

export default Home;
