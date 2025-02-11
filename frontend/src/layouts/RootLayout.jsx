import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavbarProvider from "../context/NavbarProvider";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative flex-1 bg-[#202024] text-white overflow-auto overscroll-none scroll-smooth">
        <NavbarProvider>
          <Navbar/>
          <div  className="px-6 pt-6">
          <Outlet /> {/* This will render the matched route's component */}
          </div>
       
        </NavbarProvider>
      </div>
    </div>
  );
};

export default RootLayout;
