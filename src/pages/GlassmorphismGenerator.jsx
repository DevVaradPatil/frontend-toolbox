// src/pages/GlassmorphismGenerator.jsx
import { useState } from "react";
import { Copy, Check, RefreshCw, Palette } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

const GlassmorphismGenerator = () => {
  const { isDarkMode } = useTheme();
  const [copiedButtonId, setCopiedButtonId] = useState(null);
  
  // Glassmorphism properties
  const [background, setBackground] = useState("rgba(255, 255, 255, 0.25)");
  const [backdropBlur, setBackdropBlur] = useState(5);
  const [borderRadius, setBorderRadius] = useState(16);
  const [border, setBorder] = useState("1px solid rgba(255, 255, 255, 0.18)");
  const [boxShadow, setBoxShadow] = useState("0 8px 32px 0 rgba(31, 38, 135, 0.37)");

  // Background options for the preview
  const [previewBackground, setPreviewBackground] = useState("url('https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover");
  const backgroundOptions = [
    { name: "Nature Image", value: "url('https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover" },
    { name: "Purple Gradient", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { name: "Blue Gradient", value: "linear-gradient(135deg, #667eea 0%, #7db9e8 100%)" },
    { name: "Pink Gradient", value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { name: "Green Gradient", value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { name: "Orange Gradient", value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    { name: "Dark", value: "#1a1a1a" },
    { name: "Light", value: "#f0f0f0" },
  ];

  // Preset glassmorphism styles
  const presets = [
    {
      name: "Classic Glass",
      background: "rgba(255, 255, 255, 0.25)",
      backdropBlur: 10,
      borderRadius: 16,
      border: "1px solid rgba(255, 255, 255, 0.18)",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    },
    {
      name: "Dark Glass",
      background: "rgba(0, 0, 0, 0.25)",
      backdropBlur: 15,
      borderRadius: 20,
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
    },
    {
      name: "Subtle Glass",
      background: "rgba(255, 255, 255, 0.1)",
      backdropBlur: 5,
      borderRadius: 12,
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.2)",
    },
    {
      name: "Strong Glass",
      background: "rgba(255, 255, 255, 0.4)",
      backdropBlur: 20,
      borderRadius: 24,
      border: "2px solid rgba(255, 255, 255, 0.3)",
      boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.5)",
    },
    {
      name: "Colored Glass",
      background: "rgba(99, 102, 241, 0.2)",
      backdropBlur: 12,
      borderRadius: 18,
      border: "1px solid rgba(99, 102, 241, 0.3)",
      boxShadow: "0 8px 32px 0 rgba(99, 102, 241, 0.3)",
    },
  ];

  // Generate CSS
  const generateCSS = () => {
    return `background: ${background};
backdrop-filter: blur(${backdropBlur}px);
-webkit-backdrop-filter: blur(${backdropBlur}px);
border-radius: ${borderRadius}px;
border: ${border};
box-shadow: ${boxShadow};`;
  };

  // Copy CSS to clipboard
  const copyToClipboard = (css, buttonId) => {
    navigator.clipboard.writeText(css);
    setCopiedButtonId(buttonId);
    toast.success('CSS copied to clipboard!');
    setTimeout(() => setCopiedButtonId(null), 2000);
  };

  // Apply preset
  const applyPreset = (preset) => {
    setBackground(preset.background);
    setBackdropBlur(preset.backdropBlur);
    setBorderRadius(preset.borderRadius);
    setBorder(preset.border);
    setBoxShadow(preset.boxShadow);
    toast.success(`${preset.name} applied!`);
  };

  // Random generator
  const generateRandom = () => {
    const randomOpacity = (Math.random() * 0.3 + 0.1).toFixed(2);
    const randomBlur = Math.floor(Math.random() * 20 + 5);
    const randomRadius = Math.floor(Math.random() * 20 + 8);
    const randomColor = Math.random() > 0.5 ? "255, 255, 255" : "0, 0, 0";
    const borderOpacity = (Math.random() * 0.2 + 0.1).toFixed(2);
    
    setBackground(`rgba(${randomColor}, ${randomOpacity})`);
    setBackdropBlur(randomBlur);
    setBorderRadius(randomRadius);
    setBorder(`1px solid rgba(255, 255, 255, ${borderOpacity})`);
    setBoxShadow(`0 ${Math.floor(Math.random() * 16 + 4)}px ${Math.floor(Math.random() * 40 + 16)}px 0 rgba(31, 38, 135, ${(Math.random() * 0.4 + 0.1).toFixed(2)})`);
    
    toast.success('Random glassmorphism generated!');
  };

  const glassStyle = {
    background: background,
    backdropFilter: `blur(${backdropBlur}px)`,
    WebkitBackdropFilter: `blur(${backdropBlur}px)`,
    borderRadius: `${borderRadius}px`,
    border: border,
    boxShadow: boxShadow,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1
          className={`text-3xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Glassmorphism Generator
        </h1>
        <p
          className={`${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Create modern UI elements with the frosted glass effect
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-6">
          {/* Presets */}
          <div
            className={`rounded-xl p-6 shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Presets
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {presets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  className={`p-3 text-left border rounded-lg transition-colors ${
                    isDarkMode
                      ? "border-gray-600 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`font-medium ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {preset.name}
                  </div>
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Blur: {preset.backdropBlur}px
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Controls */}
          <div
            className={`rounded-xl p-6 shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Custom Properties
              </h3>
              <button
                onClick={generateRandom}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Random
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Background Color */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Background Color
                </label>
                <input
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                  placeholder="rgba(255, 255, 255, 0.25)"
                />
              </div>

              {/* Backdrop Blur */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Backdrop Blur: {backdropBlur}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={backdropBlur}
                  onChange={(e) => setBackdropBlur(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Border Radius */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Border Radius: {borderRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Border */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Border
                </label>
                <input
                  type="text"
                  value={border}
                  onChange={(e) => setBorder(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                  placeholder="1px solid rgba(255, 255, 255, 0.18)"
                />
              </div>

              {/* Box Shadow */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Box Shadow
                </label>
                <input
                  type="text"
                  value={boxShadow}
                  onChange={(e) => setBoxShadow(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                  placeholder="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                />
              </div>
            </div>
          </div>

          {/* CSS Output */}
          <div
            className={`rounded-xl p-6 shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Generated CSS
              </h3>
              <button
                onClick={() => copyToClipboard(generateCSS(), 'css')}
                className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {copiedButtonId === 'css' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                Copy CSS
              </button>
            </div>
            <pre
              className={`p-4 rounded-lg text-sm font-mono overflow-x-auto ${
                isDarkMode
                  ? "bg-gray-900 text-gray-200"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {generateCSS()}
            </pre>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          {/* Background Selector */}
          <div
            className={`rounded-xl p-6 shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Preview Background
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {backgroundOptions.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => setPreviewBackground(bg.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    previewBackground === bg.value
                      ? 'border-blue-500'
                      : isDarkMode
                      ? 'border-gray-600'
                      : 'border-gray-200'
                  }`}
                  style={{ background: bg.value }}
                >
                  <div className="text-xs font-medium text-white drop-shadow-lg">
                    {bg.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div
            className={`rounded-xl p-6 shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Preview
            </h3>
            <div
              className="relative h-80 rounded-xl overflow-hidden"
              style={{ background: previewBackground }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-64 h-48 flex items-center justify-center"
                  style={glassStyle}
                >
                  <div className="text-center">
                    <Palette
                      className={`w-8 h-8 mx-auto mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    />
                    <h4
                      className={`text-lg font-semibold ${
                        isDarkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      Glassmorphism
                    </h4>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Frosted glass effect
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Examples */}
          <div
            className={`rounded-xl p-6 shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Different Shapes
            </h3>
            <div
              className="relative h-80 rounded-xl overflow-hidden"
              style={{ background: previewBackground }}
            >
              <div className="absolute inset-0 flex items-center justify-center gap-4 flex-wrap">
                {/* Card */}
                <div
                  className="w-32 h-32 flex items-center justify-center"
                  style={glassStyle}
                >
                  <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                </div>
                
                {/* Circle */}
                <div
                  className="w-32 h-32 flex items-center justify-center rounded-full"
                  style={{...glassStyle, borderRadius: '50%'}}
                >
                  <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                </div>
                
                {/* Pill */}
                <div
                  className="w-32 h-12 flex items-center justify-center"
                  style={{...glassStyle, borderRadius: '24px'}}
                >
                  <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismGenerator;
