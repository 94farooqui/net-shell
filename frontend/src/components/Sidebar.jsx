import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu,SquareTerminal, LayoutDashboard, Server, Users, Key, History, Save, Notebook } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Terminal", path: "/terminal", icon: <SquareTerminal size={20} /> },
    { name: "Hosts", path: "/hosts", icon: <Server size={20} /> },
    { name: "Groups", path: "/groups", icon: <Users size={20} /> },
    { name: "Credentials Manager", path: "/credentials-manager", icon: <Key size={20} /> },
    { name: "History", path: "/history", icon: <History size={20} /> },
    { name: "Saved Commands", path: "/commands", icon: <Save size={20} /> },
    { name: "Notes", path: "/notes", icon: <Notebook size={20} /> },
  ];

  return (
    <div className={`bg-[#18181b] text-white h-screen p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="mb-4 focus:outline-none">
        <Menu size={24} />
      </button>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path} className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
              {item.icon}
              {isOpen && <span className={`text-sm transition-all duration-300 delay-300 ${isOpen ?"opacity-100" :"opacity-0"} `}>{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
