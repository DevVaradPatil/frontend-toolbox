// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Menu, X, ChevronRight } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import toolsData from "../data/toolsData.js";

// Create the sidebar tools array with Home as the first item
const tools = [
  { name: "Home", path: "/", icon: Home },
  // Tools data already has icon components
  ...toolsData.map((tool) => ({
    name: tool.title,
    path: tool.path,
    icon: tool.icon,
  })),
];

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isDarkMode } = useTheme();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      const mobileMenuButton = document.getElementById("mobile-menu-button");

      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        mobileMenuButton &&
        !mobileMenuButton.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          id="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-10 h-10 rounded-md shadow-lg transition-colors ${
            isDarkMode 
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-200'
          }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed left-0 top-0 h-full transition-all duration-300 ease-in-out z-20
          ${
            isOpen
              ? "w-64 translate-x-0 shadow-xl"
              : "w-64 -translate-x-full md:translate-x-0"
          }
          ${isCollapsed ? "md:w-16" : "md:w-64"}
          ${isDarkMode 
            ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
            : 'bg-white text-gray-900 border-r border-gray-200'
          }`}
      >
        <div className={`p-4 ${isCollapsed ? "md:p-2" : ""}`}>
          <div
            className={`flex items-center justify-between mb-6 mt-2 ${
              isCollapsed ? "md:justify-center" : ""
            }`}
          >            {!isCollapsed && (
              <h1 className={`text-xl font-bold md:m-0 ml-12 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Frontend Toolbox</h1>
            )}{" "}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`hidden md:flex p-1 rounded-full transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronRight
                size={18}
                className={`transform transition-transform ${
                  !isCollapsed ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <nav className="space-y-1">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = location.pathname === tool.path;

              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  onClick={() => setIsOpen(false)}                  className={`flex items-center px-4 py-3 rounded-md transition-all ${
                    isCollapsed ? "md:justify-center md:px-2" : ""
                  } ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  title={isCollapsed ? tool.name : ""}
                >
                  <Icon
                    size={18}
                    className={isCollapsed ? "md:mr-0" : "mr-3"}
                  />
                  <span
                    className={`${
                      isCollapsed ? "md:hidden" : "block"
                    } transition-opacity`}
                  >
                    {tool.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className={`md:hidden fixed inset-0 z-10 backdrop-blur-sm ${
            isDarkMode ? 'bg-black/50' : 'bg-black/30'
          }`}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
