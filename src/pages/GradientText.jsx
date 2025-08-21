// src/pages/GradientText.jsx
import { useState, useEffect } from "react";
import { Copy, Check, Type, RefreshCw } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const GradientText = () => {
  const { isDarkMode } = useTheme();
  const [copied, setCopied] = useState(false);
  const [codeType, setCodeType] = useState("css"); // 'css' or 'tailwind'
  
  // Text properties
  const [text, setText] = useState("Gradient Text");
  const [fontSize, setFontSize] = useState(72);
  const [fontWeight, setFontWeight] = useState(700);
  const [fontFamily, setFontFamily] = useState("Inter, sans-serif");
  
  // Gradient properties
  const [gradientType, setGradientType] = useState("linear");
  const [gradientDirection, setGradientDirection] = useState("to right");
  const [gradientColors, setGradientColors] = useState([
    { id: 1, color: "#FF5F6D", position: 0 },
    { id: 2, color: "#FFC371", position: 100 }
  ]);
  
  // Presets
  const presets = [
    { 
      name: "Sunset", 
      colors: [
        { id: 1, color: "#FF5F6D", position: 0 },
        { id: 2, color: "#FFC371", position: 100 }
      ],
      direction: "to right"
    },
    { 
      name: "Ocean", 
      colors: [
        { id: 1, color: "#2193b0", position: 0 },
        { id: 2, color: "#6dd5ed", position: 100 }
      ],
      direction: "to right"
    },
    { 
      name: "Purple Love", 
      colors: [
        { id: 1, color: "#cc2b5e", position: 0 },
        { id: 2, color: "#753a88", position: 100 }
      ],
      direction: "to right"
    },
    { 
      name: "Rainbow", 
      colors: [
        { id: 1, color: "#ff0000", position: 0 },
        { id: 2, color: "#ff7f00", position: 16 },
        { id: 3, color: "#ffff00", position: 33 },
        { id: 4, color: "#00ff00", position: 50 },
        { id: 5, color: "#0000ff", position: 67 },
        { id: 6, color: "#4b0082", position: 84 },
        { id: 7, color: "#9400d3", position: 100 }
      ],
      direction: "to right"
    },
    { 
      name: "Pastel", 
      colors: [
        { id: 1, color: "#74ebd5", position: 0 },
        { id: 2, color: "#ACB6E5", position: 100 }
      ],
      direction: "to right"
    },
    { 
      name: "Candy", 
      colors: [
        { id: 1, color: "#FF85B3", position: 0 },
        { id: 2, color: "#9F95EF", position: 100 }
      ],
      direction: "to bottom right"
    }
  ];
  
  // Font families
  const fontFamilies = [
    "Inter, sans-serif",
    "Montserrat, sans-serif",
    "Roboto, sans-serif",
    "Arial, sans-serif",
    "Helvetica, sans-serif",
    "Georgia, serif",
    "Times New Roman, serif",
    "Courier New, monospace",
    "Verdana, sans-serif",
    "Impact, sans-serif"
  ];
  
  // Direction options
  const directionOptions = [
    "to right",
    "to left",
    "to bottom",
    "to top",
    "to bottom right",
    "to bottom left",
    "to top right",
    "to top left"
  ];
  
  // Generate CSS gradient string
  const generateGradientCSS = () => {
    const colorStops = gradientColors
      .sort((a, b) => a.position - b.position)
      .map(c => `${c.color} ${c.position}%`)
      .join(", ");
      
    if (gradientType === "linear") {
      return `linear-gradient(${gradientDirection}, ${colorStops}) text`;
    } else {
      // For radial gradient
      return `radial-gradient(circle at center, ${colorStops}) text`;
    }
  };
  
  // Load preset
  const loadPreset = (preset) => {
    setGradientColors([...preset.colors]);
    setGradientDirection(preset.direction);
    // Ensure we're using linear gradient for presets since they're designed for linear
    setGradientType("linear");
  };
  
  // Generate random gradient
  const generateRandomGradient = () => {
    const randomColors = [
      { 
        id: 1, 
        color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`, 
        position: 0 
      },
      { 
        id: 2, 
        color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`, 
        position: 100 
      }
    ];
    
    // Sometimes add a middle color stop
    if (Math.random() > 0.5) {
      randomColors.push({ 
        id: 3, 
        color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`, 
        position: Math.floor(Math.random() * 60) + 20  // Position between 20-80%
      });
      
      // Sort by position
      randomColors.sort((a, b) => a.position - b.position);
      // Reassign IDs after sorting
      randomColors.forEach((color, index) => {
        color.id = index + 1;
      });
    }
    
    setGradientColors(randomColors);
    setGradientDirection(directionOptions[Math.floor(Math.random() * directionOptions.length)]);
    // Reset to linear gradient for random generation
    setGradientType("linear");
  };
  
  // Add a new color stop
  const addColorStop = () => {
    if (gradientColors.length < 5) {
      // Find a reasonable position for the new stop (middle of the largest gap)
      const sortedColors = [...gradientColors].sort((a, b) => a.position - b.position);
      let largestGap = { start: 0, end: 100, size: 100 };
      
      for (let i = 0; i < sortedColors.length - 1; i++) {
        const gap = sortedColors[i + 1].position - sortedColors[i].position;
        if (gap > largestGap.size) {
          largestGap = { 
            start: sortedColors[i].position, 
            end: sortedColors[i + 1].position,
            size: gap
          };
        }
      }
      
      const newPosition = Math.round(largestGap.start + largestGap.size / 2);
      const newId = Math.max(...gradientColors.map(c => c.id)) + 1;
      
      // Generate a color that's a mix of the surrounding colors
      const hexToRgb = hex => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
      };
      
      const rgbToHex = (r, g, b) => 
        '#' + [r, g, b].map(x => Math.min(255, Math.max(0, Math.round(x))).toString(16).padStart(2, '0')).join('');
      
      let color;
      if (sortedColors.length >= 2) {
        // Find surrounding colors
        const before = sortedColors.filter(c => c.position <= newPosition).pop();
        const after = sortedColors.filter(c => c.position >= newPosition)[0];
        
        if (before && after) {
          const beforeRgb = hexToRgb(before.color);
          const afterRgb = hexToRgb(after.color);
          const ratio = (newPosition - before.position) / (after.position - before.position);
          
          const mixedRgb = [
            beforeRgb[0] + (afterRgb[0] - beforeRgb[0]) * ratio,
            beforeRgb[1] + (afterRgb[1] - beforeRgb[1]) * ratio,
            beforeRgb[2] + (afterRgb[2] - beforeRgb[2]) * ratio
          ];
          
          color = rgbToHex(...mixedRgb);
        } else {
          color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        }
      } else {
        color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
      }
      
      setGradientColors([...gradientColors, { id: newId, color, position: newPosition }]);
    }
  };
  
  // Remove a color stop
  const removeColorStop = (id) => {
    if (gradientColors.length > 2) {
      setGradientColors(gradientColors.filter(c => c.id !== id));
    }
  };
  
  // Update color stop
  const updateColorStop = (id, property, value) => {
    setGradientColors(gradientColors.map(c => {
      if (c.id === id) {
        return { ...c, [property]: value };
      }
      return c;
    }));
  };
  
  // Generate CSS code
  const generateCSS = () => {
    const gradient = generateGradientCSS();
    
    if (codeType === "css") {
      return `.gradient-text {
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  font-family: ${fontFamily};
  background: ${gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}`;
    } else {
      // Tailwind CSS - for complex gradients, we need to use inline styles
      if (gradientType === "radial" || gradientColors.length > 2) {
        return `<p class="
  text-[${fontSize}px]
  font-[${fontWeight}]
  font-[${fontFamily.split(',')[0].trim()}]
  text-transparent
  bg-clip-text
" style="background: ${gradient};">
  ${text}
</p>`;
      } else {
        // Simple two-color linear gradient can use Tailwind classes
        const directionClass = gradientDirection === "to right" ? "bg-gradient-to-r" :
                              gradientDirection === "to left" ? "bg-gradient-to-l" :
                              gradientDirection === "to bottom" ? "bg-gradient-to-b" :
                              gradientDirection === "to top" ? "bg-gradient-to-t" :
                              gradientDirection === "to bottom right" ? "bg-gradient-to-br" :
                              gradientDirection === "to bottom left" ? "bg-gradient-to-bl" :
                              gradientDirection === "to top right" ? "bg-gradient-to-tr" :
                              gradientDirection === "to top left" ? "bg-gradient-to-tl" :
                              "bg-gradient-to-r";
        
        return `<p class="
  text-[${fontSize}px]
  font-[${fontWeight}]
  font-[${fontFamily.split(',')[0].trim()}]
  ${directionClass}
  from-[${gradientColors[0].color}]
  to-[${gradientColors[gradientColors.length - 1].color}]
  text-transparent
  bg-clip-text
">
  ${text}
</p>`;
      }
    }
  };
  
  // Text style
  const textStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    fontFamily: fontFamily,
    background: generateGradientCSS(),
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    marginBottom: "1rem",
    maxWidth: "100%",
    overflowWrap: "break-word",
    lineHeight: 1.2,
    display: "inline-block"
  };
  
  // Copy CSS to clipboard
  const copyToClipboard = () => {
    const css = generateCSS();
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1
        className={`text-3xl font-bold mb-6 flex items-center ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        <Type className="mr-2" size={28} />
        Gradient Text Generator
      </h1>
      
      <div className="flex flex-col space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Left sidebar: Controls */}
        <div
          className={`p-6 rounded-lg shadow-md order-2 lg:order-1 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Text Settings
          </h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Your Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  isDarkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
                placeholder="Enter your text here"
              />
            </div>
            
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Font Size (px)
              </label>
              <input
                type="range"
                min="12"
                max="120"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              />
              <div
                className={`flex justify-between text-xs mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span>12px</span>
                <span>{fontSize}px</span>
                <span>120px</span>
              </div>
            </div>
            
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Font Weight
              </label>
              <select
                value={fontWeight}
                onChange={(e) => setFontWeight(Number(e.target.value))}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  isDarkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
              >
                <option value="100">Thin (100)</option>
                <option value="200">Extra-Light (200)</option>
                <option value="300">Light (300)</option>
                <option value="400">Regular (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi-Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra-Bold (800)</option>
                <option value="900">Black (900)</option>
              </select>
            </div>
            
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Font Family
              </label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  isDarkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
              >
                {fontFamilies.map((font, index) => (
                  <option key={index} value={font} style={{ fontFamily: font.split(',')[0].trim() }}>
                    {font.split(',')[0].trim()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <h2
            className={`text-xl font-semibold mb-4 border-t pt-4 mt-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Gradient Settings
          </h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Gradient Type
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setGradientType("linear")}
                  className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                    gradientType === "linear" 
                      ? "bg-blue-600 text-white" 
                      : isDarkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Linear
                </button>
                <button
                  onClick={() => setGradientType("radial")}
                  className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                    gradientType === "radial" 
                      ? "bg-blue-600 text-white" 
                      : isDarkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Radial
                </button>
              </div>
            </div>
            
            {gradientType === "linear" && (
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Direction
                </label>
                <select
                  value={gradientDirection}
                  onChange={(e) => setGradientDirection(e.target.value)}
                  className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                >
                  {directionOptions.map((direction, index) => (
                    <option key={index} value={direction}>
                      {direction.replace("to ", "→ ")}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Color Stops
                </label>
                {gradientColors.length < 5 && (
                  <button
                    onClick={addColorStop}
                    className={`text-xs py-1 px-2 rounded ${
                      isDarkMode
                        ? "bg-blue-900/30 text-blue-300 hover:bg-blue-800/40"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                    }`}
                  >
                    Add Color
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {gradientColors
                  .sort((a, b) => a.position - b.position)
                  .map((color) => (
                    <div key={color.id} className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={color.color}
                        onChange={(e) => updateColorStop(color.id, "color", e.target.value)}
                        className="h-8 w-10 rounded"
                      />
                      <input
                        type="number"
                        value={color.position}
                        onChange={(e) => updateColorStop(color.id, "position", Math.min(100, Math.max(0, Number(e.target.value))))}
                        min="0"
                        max="100"
                        className={`w-16 p-1 border rounded-md ${
                          isDarkMode
                            ? "border-gray-600 bg-gray-700 text-white"
                            : "border-gray-300 bg-white text-gray-900"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        %
                      </span>
                      {gradientColors.length > 2 && (
                        <button
                          onClick={() => removeColorStop(color.id)}
                          className={`${
                            isDarkMode
                              ? "text-red-400 hover:text-red-300"
                              : "text-red-500 hover:text-red-700"
                          }`}
                          aria-label="Remove color stop"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          
          <h2
            className={`text-xl font-semibold mb-4 border-t pt-4 mt-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Presets
          </h2>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {presets.map((preset, index) => (
              <button
                key={index}
                onClick={() => loadPreset(preset)}
                className={`relative h-10 rounded-md overflow-hidden transition-transform hover:scale-105 border ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
                style={{
                  background: `linear-gradient(to right, ${preset.colors.map(c => `${c.color} ${c.position}%`).join(', ')})`
                }}
                title={preset.name}
              >
                <span className="absolute inset-0 bg-black/20 flex items-center justify-center text-white text-xs font-semibold">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
          
          <button
            onClick={generateRandomGradient}
            className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-md py-2 transition-colors"
          >
            <RefreshCw size={16} className="mr-2" />
            Random Gradient
          </button>
        </div>
        
        {/* Main content area: Preview and code output */}
        <div className="lg:col-span-2 flex flex-col order-1 lg:order-2">
          {/* Code type toggle */}
          <div className="flex justify-end mb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setCodeType("css")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  codeType === "css" 
                    ? "bg-blue-600 text-white" 
                    : isDarkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                CSS
              </button>
              <button
                onClick={() => setCodeType("tailwind")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  codeType === "tailwind" 
                    ? "bg-blue-600 text-white" 
                    : isDarkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Tailwind
              </button>
            </div>
          </div>
          
          {/* Preview */}
          <div
            className={`p-6 rounded-lg shadow-md mb-6 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Preview
            </h2>
            <div
              className={`border rounded-lg p-8 flex justify-center items-center min-h-[200px] ${
                isDarkMode
                  ? "bg-gray-900 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div style={textStyle}>
                {text || "Gradient Text"}
              </div>
            </div>
          </div>
          
          {/* Generated code */}
          <div
            className={`p-6 rounded-lg shadow-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Generated {codeType === "css" ? "CSS" : "Tailwind"} Code
              </h2>
              <button
                onClick={copyToClipboard}
                className={`flex items-center px-3 py-1 rounded-md transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {copied ? (
                  <Check size={16} className="mr-1 text-green-500" />
                ) : (
                  <Copy size={16} className="mr-1" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre
              className={`p-4 rounded-md overflow-x-auto text-sm ${
                isDarkMode
                  ? "bg-gray-900 text-gray-300"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {generateCSS()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientText;
