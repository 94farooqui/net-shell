import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 bg-[#36353f] text-white p-6 overflow-auto">
        <Outlet /> {/* This will render the matched route's component */}
      </div>
    </div>
  );
};

export default RootLayout;
