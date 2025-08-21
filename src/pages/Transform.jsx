import { useState } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  RotateCw,
  MoveHorizontal,
  LucideExpand,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

const Transform = () => {
  const { isDarkMode } = useTheme();
  const [copied, setCopied] = useState(false);

  // Transform properties
  const [rotate, setRotate] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  // Element properties
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [backgroundColor, setBackgroundColor] = useState("#3490dc");
  const [borderRadius, setBorderRadius] = useState(0);

  // Generate CSS transform
  const generateTransformCSS = () => {
    const transforms = [];

    if (rotate !== 0) transforms.push(`rotate(${rotate}deg)`);
    if (scaleX !== 1 || scaleY !== 1)
      transforms.push(`scale(${scaleX}, ${scaleY})`);
    if (skewX !== 0) transforms.push(`skewX(${skewX}deg)`);
    if (skewY !== 0) transforms.push(`skewY(${skewY}deg)`);
    if (translateX !== 0) transforms.push(`translateX(${translateX}px)`);
    if (translateY !== 0) transforms.push(`translateY(${translateY}px)`);

    if (transforms.length === 0) return "transform: none;";
    return `transform: ${transforms.join(" ")};`;
  };

  // Reset all transformations
  const resetTransformations = () => {
    setRotate(0);
    setScaleX(1);
    setScaleY(1);
    setSkewX(0);
    setSkewY(0);
    setTranslateX(0);
    setTranslateY(0);
  };

  // Generate random transformation
  const generateRandomTransform = () => {
    setRotate(Math.floor(Math.random() * 360));
    setScaleX(Math.max(0.5, Math.random() * 2).toFixed(2));
    setScaleY(Math.max(0.5, Math.random() * 2).toFixed(2));
    setSkewX(Math.floor(Math.random() * 30) - 15);
    setSkewY(Math.floor(Math.random() * 30) - 15);
    setTranslateX(Math.floor(Math.random() * 100) - 50);
    setTranslateY(Math.floor(Math.random() * 100) - 50);

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
  };
  // Copy CSS to clipboard
  const copyToClipboard = () => {
    const css = generateTransformCSS();
    navigator.clipboard.writeText(css);
    setCopied(true);
    toast.success("CSS copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Element style with all transforms
  const elementStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor,
    borderRadius: `${borderRadius}px`,
    transform: `${rotate !== 0 ? `rotate(${rotate}deg)` : ""} 
                ${
                  scaleX !== 1 || scaleY !== 1
                    ? `scale(${scaleX}, ${scaleY})`
                    : ""
                } 
                ${skewX !== 0 ? `skewX(${skewX}deg)` : ""} 
                ${skewY !== 0 ? `skewY(${skewY}deg)` : ""} 
                ${translateX !== 0 ? `translateX(${translateX}px)` : ""} 
                ${translateY !== 0 ? `translateY(${translateY}px)` : ""}`,
    transition: "transform 0.3s ease",
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1
        className={`text-3xl font-bold mb-6 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        CSS Transform Playground
      </h1>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={resetTransformations}
          className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
        >
          Reset Transformations
        </button>
        <button
          onClick={generateRandomTransform}
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
        >
          <RefreshCw size={16} className="mr-2" />
          Random Transform
        </button>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preview */}
        <div className="lg:col-span-2">
          <div
            className={`p-8 rounded-lg mb-4 h-96 flex items-center justify-center overflow-hidden ${
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <div style={elementStyle}></div>
          </div>

          {/* CSS Output */}
          <div
            className={`p-4 rounded-md relative mb-4 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <pre
              className={`text-sm whitespace-pre-wrap ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {generateTransformCSS()}
            </pre>
            <button
              onClick={copyToClipboard}
              className={`absolute top-3 right-3 p-1 ${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="Copy CSS"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Rotate */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                className={`flex items-center text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <RotateCw size={16} className="mr-2" />
                Rotate
              </label>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {rotate}°
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="-180"
                max="180"
                value={rotate}
                onChange={(e) => setRotate(parseInt(e.target.value))}
                className="w-full"
              />
              <input
                type="number"
                min="-180"
                max="180"
                value={rotate}
                onChange={(e) => setRotate(Number(e.target.value))}
                className={`w-16 border rounded-md py-1 px-2 text-sm ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            {/* Scale */}
            <div
              className={`pt-2 border-t ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`font-medium text-sm mb-3 flex items-center ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <LucideExpand size={16} className="mr-2" />
                Scale
              </h3>

              {/* Scale X */}
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <label
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Scale X
                  </label>
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {scaleX}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scaleX}
                    onChange={(e) => setScaleX(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scaleX}
                    onChange={(e) => setScaleX(Number(e.target.value))}
                    className={`w-16 border rounded-md py-1 px-2 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              {/* Scale Y */}
              <div>
                <div className="flex justify-between mb-1">
                  <label
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Scale Y
                  </label>
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {scaleY}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scaleY}
                    onChange={(e) => setScaleY(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scaleY}
                    onChange={(e) => setScaleY(Number(e.target.value))}
                    className={`w-16 border rounded-md py-1 px-2 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Skew */}
            <div
              className={`pt-2 border-t ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`font-medium text-sm mb-3 flex items-center ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="2"
                    transform="skewX(15)"
                  />
                </svg>
                Skew
              </h3>

              {/* Skew X */}
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <label
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Skew X
                  </label>
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {skewX}°
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={skewX}
                    onChange={(e) => setSkewX(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="-45"
                    max="45"
                    value={skewX}
                    onChange={(e) => setSkewX(Number(e.target.value))}
                    className={`w-16 border rounded-md py-1 px-2 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              {/* Skew Y */}
              <div>
                <div className="flex justify-between mb-1">
                  <label
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Skew Y
                  </label>
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {skewY}°
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={skewY}
                    onChange={(e) => setSkewY(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="-45"
                    max="45"
                    value={skewY}
                    onChange={(e) => setSkewY(Number(e.target.value))}
                    className={`w-16 border rounded-md py-1 px-2 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Translate */}
            <div
              className={`pt-2 border-t ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`font-medium text-sm mb-3 flex items-center ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <MoveHorizontal size={16} className="mr-2" />
                Translate
              </h3>

              {/* Translate X */}
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <label
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Translate X
                  </label>
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {translateX}px
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={translateX}
                    onChange={(e) => setTranslateX(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="-100"
                    max="100"
                    value={translateX}
                    onChange={(e) => setTranslateX(Number(e.target.value))}
                    className={`w-16 border rounded-md py-1 px-2 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              {/* Translate Y */}
              <div>
                <div className="flex justify-between mb-1">
                  <label
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Translate Y
                  </label>
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {translateY}px
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={translateY}
                    onChange={(e) => setTranslateY(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="-100"
                    max="100"
                    value={translateY}
                    onChange={(e) => setTranslateY(Number(e.target.value))}
                    className={`w-16 border rounded-md py-1 px-2 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Element Properties */}
            <div
              className={`pt-2 border-t ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`font-medium text-sm mb-3 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Element Properties
              </h3>

              {/* Size */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label
                    className={`block text-xs mb-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Width
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="300"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className={`w-full border rounded-md py-1 px-2 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs mb-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Height
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="300"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className={`w-full border rounded-md py-1 px-2 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              {/* Border Radius */}
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <label
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Border Radius
                  </label>
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {borderRadius}px
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Background Color */}
              <div>
                <label
                  className={`block text-xs mb-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Background Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-10 h-10 p-0 rounded-md border-0"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className={`flex-1 border rounded-md py-1 px-2 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transform;
