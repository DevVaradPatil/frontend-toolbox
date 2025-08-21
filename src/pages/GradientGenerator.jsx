// src/pages/GradientGenerator.jsx
import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import gradientPresets from "../data/gradientPresets.json";

const GradientGenerator = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("presets");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedButtonId, setCopiedButtonId] = useState(null);

  // Custom gradient state
  const [gradientType, setGradientType] = useState("linear");
  const [gradientDirection, setGradientDirection] = useState("to right");
  const [colorStops, setColorStops] = useState([
    { color: "#3490dc", position: 0 },
    { color: "#6574cd", position: 100 },
  ]);

  // Generate categories from presets
  const categories = [
    "all",
    ...new Set(gradientPresets.map((preset) => preset.category)),
  ];

  // Filter presets by category
  const filteredPresets =
    selectedCategory === "all"
      ? gradientPresets
      : gradientPresets.filter(
          (preset) => preset.category === selectedCategory
        );

  // Generate CSS for custom gradient
  const generateGradientCSS = () => {
    const colorStopsCSS = colorStops
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");

    if (gradientType === "linear") {
      return `background: linear-gradient(${gradientDirection}, ${colorStopsCSS});`;
    } else {
      return `background: radial-gradient(circle, ${colorStopsCSS});`;
    }
  };

  // Get CSS for preset gradient
  const getPresetCSS = (preset) => {
    const colorStopsCSS = preset.colors.join(", ");

    if (preset.type === "linear") {
      return `background: linear-gradient(${preset.direction}, ${colorStopsCSS});`;
    } else {
      return `background: radial-gradient(circle, ${colorStopsCSS});`;
    }
  };  // Copy CSS to clipboard
  const copyToClipboard = (css, buttonId) => {
    navigator.clipboard.writeText(css);
    setCopiedButtonId(buttonId);
    toast.success('CSS copied to clipboard!');
    setTimeout(() => setCopiedButtonId(null), 2000);
  };
  // Add color stop
  const addColorStop = () => {
    if (colorStops.length < 5) {
      const lastPosition = colorStops[colorStops.length - 1].position;
      setColorStops([
        ...colorStops,
        { color: "#6366f1", position: Math.min(lastPosition + 20, 100) },
      ]);
      toast.success('Color stop added!');
    } else {
      toast.error('Maximum of 5 color stops allowed');
    }
  };

  // Remove color stop
  const removeColorStop = (index) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index));
      toast.success('Color stop removed');
    }
  };
  // Update color stop
  const updateColorStop = (index, field, value) => {
    const updatedStops = [...colorStops];
    updatedStops[index] = { ...updatedStops[index], [field]: value };

    // If we're updating position, sort the stops
    if (field === "position") {
      updatedStops.sort((a, b) => a.position - b.position);
    }

    setColorStops(updatedStops);
    
    // Show toast only when changing color, not for position changes (to avoid spam)
    if (field === "color") {
      toast.success('Color updated!', { duration: 1000 });
    }
  };
  // Random gradient generator
  const generateRandomGradient = () => {
    const randomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const directions = [
      "to right",
      "to left",
      "to top",
      "to bottom",
      "to right top",
      "to right bottom",
      "to left top",
      "to left bottom",
    ];

    const stopCount = Math.floor(Math.random() * 2) + 2; // 2-3 stops
    const newStops = [];

    for (let i = 0; i < stopCount; i++) {
      newStops.push({
        color: randomColor(),
        position: Math.round((i / (stopCount - 1)) * 100),
      });
    }

    setGradientType(Math.random() > 0.8 ? "radial" : "linear");
    setGradientDirection(
      directions[Math.floor(Math.random() * directions.length)]
    );
    setColorStops(newStops);
    setActiveTab("generator");
    toast.success('Random gradient generated!');
  };
  // Load a preset into the generator
  const loadPreset = (preset) => {
    setGradientType(preset.type);
    setGradientDirection(preset.direction);

    // Convert preset colors to color stops
    const newStops = preset.colors.map((color, index, array) => ({
      color: color,
      position: Math.round((index / (array.length - 1)) * 100),
    }));

    setColorStops(newStops);
    setActiveTab("generator");
    toast.success(`Loaded "${preset.name}" preset!`);
  };

  // Custom gradient style
  const customGradientStyle = {
    background:
      gradientType === "linear"
        ? `linear-gradient(${gradientDirection}, ${colorStops
            .map((stop) => `${stop.color} ${stop.position}%`)
            .join(", ")})`
        : `radial-gradient(circle, ${colorStops
            .map((stop) => `${stop.color} ${stop.position}%`)
            .join(", ")})`,
  };

  return (    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Gradient Generator
      </h1>

      {/* Tabs */}
      <div className={`flex mb-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "presets"
              ? `border-b-2 border-blue-500 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`
              : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
          onClick={() => setActiveTab("presets")}
        >
          Preset Gradients
        </button>        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "generator"
              ? `border-b-2 border-blue-500 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`
              : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
          onClick={() => setActiveTab("generator")}
        >
          Custom Generator
        </button>
      </div>

      {/* Random gradient button */}
      <div className="mb-6">
        <button
          onClick={generateRandomGradient}
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
        >
          <RefreshCw size={16} className="mr-2" />
          Generate Random Gradient
        </button>
      </div>

      {/* Presets Tab */}
      {activeTab === "presets" && (
        <>
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}                className={`px-3 py-1 text-sm rounded-full capitalize ${
                  selectedCategory === category
                    ? `${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`
                    : `${isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}          </div>
          {/* Presets grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPresets.map((preset) => {
              const presetStyle = {
                background:
                  preset.type === "linear"
                    ? `linear-gradient(${
                        preset.direction
                      }, ${preset.colors.join(", ")})`
                    : `radial-gradient(circle, ${preset.colors.join(", ")})`,
                width: "100%",
              };

              const presetCSS = getPresetCSS(preset);

              return (                <div
                  key={preset.id}
                  className={`rounded-lg shadow-md overflow-hidden border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div
                    className="h-32 w-full relative group cursor-pointer"
                    style={presetStyle}
                    onClick={() => loadPreset(preset)}
                  >
                    <div className="absolute inset-0 bg-transparent hover:bg-black hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all">
                        Use This Gradient
                      </span>
                    </div>
                  </div>
                  {/* Gradient Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {preset.name}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-200' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {preset.category}
                      </span>
                    </div>

                    <div className="flex space-x-2 mb-2">
                      {preset.colors.map((color, index) => (                        <div
                          key={index}
                          className={`w-6 h-6 rounded-full border ${
                            isDarkMode ? 'border-gray-600' : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between items-center">                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {preset.type}, {preset.direction}
                      </span><button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(presetCSS, `preset-${preset.id}`);
                        }}
                        className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                        title="Copy CSS"
                      >
                        {copiedButtonId === `preset-${preset.id}` ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Generator Tab */}
      {activeTab === "generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview */}
          <div className="lg:col-span-2">
            <div
              className="h-64 w-full rounded-lg shadow-md mb-4"
              style={customGradientStyle}
            />            {/* CSS Output */}            <div className={`p-4 rounded-md relative mb-4 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <pre className={`text-sm whitespace-pre-wrap ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {generateGradientCSS()}
              </pre>
              <button
                onClick={() => copyToClipboard(generateGradientCSS(), "custom-gradient")}
                className={`absolute top-3 right-3 p-1 ${
                  isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Copy CSS"
              >
                {copiedButtonId === "custom-gradient" ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Gradient Type */}            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Gradient Type
              </label>
              <div className="flex space-x-4">                <label className={`inline-flex items-center ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <input
                    type="radio"
                    className="form-radio"
                    value="linear"
                    checked={gradientType === "linear"}
                    onChange={() => {
                      setGradientType("linear");
                      toast.success('Switched to linear gradient');
                    }}
                  />
                  <span className="ml-2">Linear</span>
                </label>
                <label className={`inline-flex items-center ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <input
                    type="radio"
                    className="form-radio"
                    value="radial"
                    checked={gradientType === "radial"}
                    onChange={() => {
                      setGradientType("radial");
                      toast.success('Switched to radial gradient');
                    }}
                  />
                  <span className="ml-2">Radial</span>
                </label>
              </div>
            </div>

            {/* Direction (only for linear) */}
            {gradientType === "linear" && (              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Direction
                </label>
                <select
                  className={`w-full rounded-md py-2 px-3 text-sm border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  value={gradientDirection}
                  onChange={(e) => {
                    setGradientDirection(e.target.value);
                    toast.success(`Direction set to ${e.target.value}`, { duration: 1000 });
                  }}
                >
                  <option value="to right">Left to Right</option>
                  <option value="to left">Right to Left</option>
                  <option value="to bottom">Top to Bottom</option>
                  <option value="to top">Bottom to Top</option>
                  <option value="to bottom right">
                    Top Left to Bottom Right
                  </option>
                  <option value="to bottom left">
                    Top Right to Bottom Left
                  </option>
                  <option value="to top right">Bottom Left to Top Right</option>
                  <option value="to top left">Bottom Right to Top Left</option>
                </select>
              </div>
            )}

            {/* Color Stops */}
            <div>              <div className="flex justify-between items-center mb-2">
                <label className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Color Stops
                </label>                {colorStops.length < 5 && (
                  <button
                    onClick={addColorStop}
                    className={`text-xs px-2 py-1 rounded ${
                      isDarkMode 
                        ? 'bg-blue-900 hover:bg-blue-800 text-blue-200' 
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                    }`}
                  >
                    Add Color
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {colorStops.map((stop, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) =>
                        updateColorStop(index, "color", e.target.value)
                      }
                      className="w-10 h-10 rounded-md border-0"
                    />
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={stop.position}
                        onChange={(e) =>
                          updateColorStop(
                            index,
                            "position",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full"
                      />                      <div className={`flex justify-between text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <span>{stop.color}</span>
                        <span>{stop.position}%</span>
                      </div>
                    </div>
                    {colorStops.length > 2 && (
                      <button
                        onClick={() => removeColorStop(index)}
                        className="text-red-500 hover:text-red-700"
                        title="Remove color stop"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradientGenerator;
