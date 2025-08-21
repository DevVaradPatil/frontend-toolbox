// src/components/ToolCard.jsx
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const ToolCard = ({ title, description, icon: Icon, path }) => {
  const { isDarkMode } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);

  // Handle mouse move to create spotlight effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Calculate relative position of mouse inside the card (0-100%)
    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <Link to={path} className="block">      <div
        ref={cardRef}
        className={`relative rounded-lg shadow-md transition-all p-6 h-full ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } ${isHovering ? "shadow-lg" : "shadow-md"}`}
        style={{
          backgroundImage: isHovering
            ? `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
            : "none",
          backgroundSize: "150% 150%",
          backgroundPosition: "center",
          border: "1px solid transparent",
          backgroundClip: "padding-box",
          boxShadow:
            isHovering &&
            `0 0 20px rgba(59, 130, 246, 0.15), 
               inset 0 0 0 1px rgba(59, 130, 246, ${
                 0.1 +
                 (Math.abs(position.x - 50) + Math.abs(position.y - 50)) / 200
               })`,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >        <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-full ${
          isDarkMode 
            ? 'bg-blue-900 text-blue-300' 
            : 'bg-blue-100 text-blue-600'
        }`}>
          <Icon size={24} />
        </div>
        <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
      </div>
    </Link>
  );
};

export default ToolCard;
