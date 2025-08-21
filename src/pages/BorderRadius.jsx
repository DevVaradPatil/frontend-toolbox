// src/pages/BorderRadius.jsx
import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import borderRadiusPresets from "../data/borderRadiusPresets.json";

const BorderRadius = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("presets");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copied, setCopied] = useState(false);

  // Border radius values state
  const [topLeft, setTopLeft] = useState("10");
  const [topRight, setTopRight] = useState("10");
  const [bottomRight, setBottomRight] = useState("10");
  const [bottomLeft, setBottomLeft] = useState("10");
  const [unit, setUnit] = useState("px");
  const [width, setWidth] = useState("200");
  const [height, setHeight] = useState("200");
  const [backgroundColor, setBackgroundColor] = useState("#3490dc");

  // Generate categories from presets
  const categories = [
    "all",
    ...new Set(borderRadiusPresets.map((preset) => preset.category)),
  ];

  // Filter presets by category
  const filteredPresets =
    selectedCategory === "all"
      ? borderRadiusPresets
      : borderRadiusPresets.filter(
          (preset) => preset.category === selectedCategory
        );

  // Generate CSS for custom border radius
  const generateBorderRadiusCSS = () => {
    return `border-radius: ${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit};`;
  };

  // Copy CSS to clipboard
  const copyToClipboard = (css) => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate random border radius
  const generateRandomBorderRadius = () => {
    const randomValue = () => Math.floor(Math.random() * 50); // 0-50

    setTopLeft(randomValue().toString());
    setTopRight(randomValue().toString());
    setBottomRight(randomValue().toString());
    setBottomLeft(randomValue().toString());

    // Random background color
    const randomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    setBackgroundColor(randomColor());
    setActiveTab("generator");
  };

  // Load a preset
  const loadPreset = (preset) => {
    setTopLeft(preset.topLeft.replace(/[^0-9]/g, "")); // Extract numeric value
    setTopRight(preset.topRight.replace(/[^0-9]/g, ""));
    setBottomRight(preset.bottomRight.replace(/[^0-9]/g, ""));
    setBottomLeft(preset.bottomLeft.replace(/[^0-9]/g, ""));

    // Handle specific "pill" shape with 9999px values
    if (preset.id === "rounded-full") {
      setUnit("px");
    }

    setActiveTab("generator");
  };

  // Handle setting all corners at once
  const setAllCorners = (value) => {
    setTopLeft(value);
    setTopRight(value);
    setBottomRight(value);
    setBottomLeft(value);
  };

  // Custom border radius style
  const customStyle = {
    width: `${width}${unit === "%" ? "%" : "px"}`,
    height: `${height}${unit === "%" ? "%" : "px"}`,
    backgroundColor: backgroundColor,
    borderRadius: `${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit}`,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">      <h1 className={`text-3xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Border Radius Visualizer
      </h1>

      {/* Tabs */}
      <div className={`flex mb-6 border-b ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "presets"
              ? `border-b-2 border-blue-500 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`
              : `${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-gray-300' 
                    : 'text-gray-500 hover:text-gray-700'
                }`
          }`}
          onClick={() => setActiveTab("presets")}
        >
          Presets
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "generator"
              ? `border-b-2 border-blue-500 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`
              : `${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-gray-300' 
                    : 'text-gray-500 hover:text-gray-700'
                }`
          }`}
          onClick={() => setActiveTab("generator")}
        >
          Generator
        </button>
      </div>

      {/* Random button */}
      <div className="mb-6">
        <button
          onClick={generateRandomBorderRadius}
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
        >
          <RefreshCw size={16} className="mr-2" />
          Generate Random Border Radius
        </button>
      </div>

      {/* Generator Tab */}
      {activeTab === "generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview */}
          <div className="lg:col-span-2">
            <div className={`p-8 rounded-lg mb-4 flex items-center justify-center ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>              <div
                style={customStyle}
                className={`border ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-300'
                }`}
              ></div>
            </div>

            {/* CSS Output */}
            <div className={`p-4 rounded-md relative mb-4 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <pre className={`text-sm whitespace-pre-wrap ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {generateBorderRadiusCSS()}
              </pre>
              <button
                onClick={() => copyToClipboard(generateBorderRadiusCSS())}
                className={`absolute top-3 right-3 p-1 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-gray-300' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Copy CSS"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Units */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Unit Type
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    value="px"
                    checked={unit === "px"}
                    onChange={() => setUnit("px")}
                  />
                  <span className="ml-2">px</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    value="%"
                    checked={unit === "%"}
                    onChange={() => setUnit("%")}
                  />
                  <span className="ml-2">%</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    value="em"
                    checked={unit === "em"}
                    onChange={() => setUnit("em")}
                  />
                  <span className="ml-2">em</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    value="rem"
                    checked={unit === "rem"}
                    onChange={() => setUnit("rem")}
                  />
                  <span className="ml-2">rem</span>
                </label>
              </div>
            </div>

            {/* All corners at once */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                All Corners
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={
                    topLeft === topRight &&
                    topLeft === bottomRight &&
                    topLeft === bottomLeft
                      ? topLeft
                      : ""
                  }
                  onChange={(e) => setAllCorners(e.target.value)}
                  className="w-full"
                />
                <input
                  type="number"
                  min="0"
                  value={
                    topLeft === topRight &&
                    topLeft === bottomRight &&
                    topLeft === bottomLeft
                      ? topLeft
                      : ""
                  }
                  onChange={(e) => setAllCorners(e.target.value)}
                  className={`w-16 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } border rounded-md py-1 px-2 text-sm`}
                />
              </div>
            </div>

            {/* Individual corners */}
            <div className="space-y-4">
              <h3 className={`font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Individual Corners
              </h3>

              {/* Top Left */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className={`block text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Top Left
                  </label>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {topLeft}
                    {unit}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={topLeft}
                    onChange={(e) => setTopLeft(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="0"
                    value={topLeft}
                    onChange={(e) => setTopLeft(e.target.value)}
                    className={`w-16 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border rounded-md py-1 px-2 text-sm`}
                  />
                </div>
              </div>

              {/* Top Right */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className={`block text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Top Right
                  </label>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {topRight}
                    {unit}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={topRight}
                    onChange={(e) => setTopRight(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="0"
                    value={topRight}
                    onChange={(e) => setTopRight(e.target.value)}
                    className={`w-16 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border rounded-md py-1 px-2 text-sm`}
                  />
                </div>
              </div>

              {/* Bottom Right */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className={`block text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Bottom Right
                  </label>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {bottomRight}
                    {unit}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={bottomRight}
                    onChange={(e) => setBottomRight(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="0"
                    value={bottomRight}
                    onChange={(e) => setBottomRight(e.target.value)}
                    className={`w-16 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border rounded-md py-1 px-2 text-sm`}
                  />
                </div>
              </div>

              {/* Bottom Left */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className={`block text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Bottom Left
                  </label>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {bottomLeft}
                    {unit}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={bottomLeft}
                    onChange={(e) => setBottomLeft(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="0"
                    value={bottomLeft}
                    onChange={(e) => setBottomLeft(e.target.value)}
                    className={`w-16 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border rounded-md py-1 px-2 text-sm`}
                  />
                </div>
              </div>
            </div>

            {/* Box Dimensions */}
            <div className={`pt-4 border-t space-y-4 ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h3 className={`font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Box Properties
              </h3>

              {/* Width */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className={`block text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Width
                  </label>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {width}
                    {unit === "%" ? "%" : "px"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="50"
                    max="400"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="50"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className={`w-16 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border rounded-md py-1 px-2 text-sm`}
                  />
                </div>
              </div>

              {/* Height */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className={`block text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Height
                  </label>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {height}
                    {unit === "%" ? "%" : "px"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="50"
                    max="400"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="50"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className={`w-16 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border rounded-md py-1 px-2 text-sm`}
                  />
                </div>
              </div>

              {/* Background Color */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className={`block text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Background Color
                  </label>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {backgroundColor}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-10 h-10 rounded-md border-0"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 border rounded-md py-1 px-2 text-sm"
                    style={{
                      backgroundColor: isDarkMode ? '#374151' : '#fff',
                      borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
                      color: isDarkMode ? '#F9FAFB' : '#111827'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Presets Tab */}
      {activeTab === "presets" && (
        <>
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 text-sm rounded-full capitalize ${
                  selectedCategory === category
                    ? `${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`
                    : `${isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Presets grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPresets.map((preset) => {
              const presetStyle = {
                width: "100%",
                height: "120px",
                backgroundColor: "#3490dc",
                borderRadius: `${preset.topLeft} ${preset.topRight} ${preset.bottomRight} ${preset.bottomLeft}`,
              };

              const presetCSS = `border-radius: ${preset.topLeft} ${preset.topRight} ${preset.bottomRight} ${preset.bottomLeft};`;

              return (
                <div
                  key={preset.id}
                  className={`rounded-lg shadow-md overflow-hidden border ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}
                >
                  <div
                    className="h-32 w-full relative group cursor-pointer"
                    onClick={() => loadPreset(preset)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div
                        style={presetStyle}
                        className={`border ${
                          isDarkMode ? 'border-gray-600' : 'border-gray-300'
                        }`}
                      ></div>
                    </div>
                    <div className="absolute inset-0 bg-transparent hover:bg-black/50 hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <span className={`opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all ${
                        isDarkMode ? 'text-gray-100' : 'text-white'
                      }`}>
                        Use This Border Radius
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {preset.name}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                        isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {preset.category}
                      </span>
                    </div>

                    <div className="flex space-x-2 mb-2">
                      <div className={`flex flex-wrap gap-1 text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <span title="Top Left">TL: {preset.topLeft}</span>
                        <span title="Top Right">TR: {preset.topRight}</span>
                        <span title="Bottom Right">
                          BR: {preset.bottomRight}
                        </span>
                        <span title="Bottom Left">BL: {preset.bottomLeft}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Click to apply
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(presetCSS);
                        }}
                        className={`${
                          isDarkMode 
                            ? 'text-gray-400 hover:text-gray-300' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                        title="Copy CSS"
                      >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default BorderRadius;
