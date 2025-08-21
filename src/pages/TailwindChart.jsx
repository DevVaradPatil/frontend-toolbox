// filepath: e:\Projects\Personal Projects\frontend-toolbox\src\pages\TailwindChart.jsx
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import tailwindColors from '../data/tailwindColors.json';

const TailwindChart = () => {
  const { isDarkMode } = useTheme();
  const [copiedColor, setCopiedColor] = useState(null);

  // Function to copy color to clipboard
  const copyToClipboard = (colorHex) => {
    navigator.clipboard.writeText(colorHex);
    setCopiedColor(colorHex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Get contrasting text color (black or white) based on background color
  const getContrastColor = (hexColor) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate perceived brightness using the formula
    // (299*R + 587*G + 114*B) / 1000
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Return black for bright colors, white for dark ones
    return brightness > 128 ? '#000000' : '#ffffff';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className={`text-3xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Tailwind CSS Color Reference
      </h1>
      
      <p className={`mb-8 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Click on any color to copy its hex code to your clipboard. Each column represents a different color palette with its various shades.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {Object.entries(tailwindColors).map(([colorName, shades]) => (
          <div key={colorName} className={`rounded-lg overflow-hidden border shadow-sm ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className={`p-3 border-b ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
            }`}>
              <h3 className={`font-medium capitalize ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>{colorName}</h3>
            </div>
            <div className={`divide-y ${
              isDarkMode ? 'divide-gray-800' : 'divide-gray-100'
            }`}>
              {Object.entries(shades).map(([shade, hexCode]) => {
                const contrastColor = getContrastColor(hexCode);
                return (                  <button
                    key={`${colorName}-${shade}`}
                    className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                      isDarkMode ? 'hover:brightness-110' : 'hover:brightness-95'
                    }`}
                    style={{
                      backgroundColor: hexCode,
                      color: contrastColor
                    }}
                    onClick={() => copyToClipboard(hexCode)}
                    title={`Copy ${hexCode}`}
                  >
                    <span className="font-mono text-sm">{shade}</span>
                    <div className="flex items-center">
                      <span className="font-mono text-sm mr-2">{hexCode}</span>
                      {copiedColor === hexCode ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {copiedColor && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-md flex items-center ${
          isDarkMode ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
        }`}>
          <Check size={16} className="mr-2" />
          <span>Copied {copiedColor} to clipboard!</span>
        </div>
      )}
    </div>
  );
};

export default TailwindChart;