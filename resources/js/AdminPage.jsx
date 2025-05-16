import { useState } from "react";
import Sidebar from "@src/Components/Sidebar";
import Navbar from "@src/Components/Navbar";

const AdminPage = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isCollapsed={isCollapsed} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar dengan tombol collapse di desktop */}
        <Navbar toggleSidebar={toggleSidebar} toggleCollapse={toggleCollapse} />
        <div className="flex-1 overflow-auto p-5 bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
