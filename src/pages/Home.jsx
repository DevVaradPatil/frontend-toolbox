// src/pages/Home.jsx
import { useState } from "react";
import { Search, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ToolCard from "../components/ToolCard";
import toolsData from "../data/toolsData.js";

// No need for mapping now, the icons are directly in the toolsData
const tools = toolsData;

const Home = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tools based on search term
  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Frontend Toolbox
        </h1>
        <p className={`text-xl max-w-2xl mx-auto mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          A collection of handy tools for frontend developers
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-10 py-3 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            {searchTerm && (              <button
                onClick={clearSearch}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                  isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results count */}
      {searchTerm && (        <div className="text-center mb-6">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {filteredTools.length === 0 
              ? "No tools found" 
              : `${filteredTools.length} tool${filteredTools.length === 1 ? '' : 's'} found`
            }
            {searchTerm && (
              <span className="ml-1">
                for "<span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{searchTerm}</span>"
              </span>
            )}
          </p>
        </div>
      )}

      {/* Tools Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.path}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            path={tool.path}
          />
        ))}
      </div>

      {/* No results message */}
      {searchTerm && filteredTools.length === 0 && (        <div className="text-center py-12">
          <div className={`mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <Search className="w-16 h-16 mx-auto opacity-50" />
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            No tools found
          </h3>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Try searching with different keywords or browse all tools.
          </p>
          <button
            onClick={clearSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
