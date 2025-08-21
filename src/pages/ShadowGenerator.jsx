import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import shadowPresets from "../data/shadowPresets.json";

const ShadowGenerator = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("presets");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedButtonId, setCopiedButtonId] = useState(null);

  // Custom shadow state
  const [horizontalOffset, setHorizontalOffset] = useState("0px");
  const [verticalOffset, setVerticalOffset] = useState("4px");
  const [blurRadius, setBlurRadius] = useState("8px");
  const [spreadRadius, setSpreadRadius] = useState("0px");
  const [shadowColor, setShadowColor] = useState("rgba(0, 0, 0, 0.2)");
  const [inset, setInset] = useState(false);
  const [opacity, setOpacity] = useState(20);
  const [multiShadow, setMultiShadow] = useState(false);
  const [shadowLayers, setShadowLayers] = useState([
    {
      horizontalOffset: "0px",
      verticalOffset: "4px",
      blurRadius: "8px",
      spreadRadius: "0px",
      color: "rgba(0, 0, 0, 0.2)",
      inset: false
    }
  ]);

  // Generate categories from presets
  const categories = [
    "all",
    ...new Set(shadowPresets.map((preset) => preset.category)),
  ];

  // Filter presets by category
  const filteredPresets =
    selectedCategory === "all"
      ? shadowPresets
      : shadowPresets.filter(
          (preset) => preset.category === selectedCategory
        );

  // Generate CSS for custom shadow
  const generateShadowCSS = () => {
    if (multiShadow) {
      const shadowsCSS = shadowLayers.map(layer => {
        const insetValue = layer.inset ? ' inset' : '';
        return `${insetValue} ${layer.horizontalOffset} ${layer.verticalOffset} ${layer.blurRadius} ${layer.spreadRadius} ${layer.color}`;
      }).join(', ');
      
      return `box-shadow: ${shadowsCSS};`;
    } else {
      const insetValue = inset ? ' inset' : '';
      return `box-shadow:${insetValue} ${horizontalOffset} ${verticalOffset} ${blurRadius} ${spreadRadius} ${shadowColor};`;
    }
  };

  // Get CSS for preset shadow
  const getPresetCSS = (preset) => {
    if (preset.multiShadow) {
      const shadowsCSS = preset.multiShadow.map(shadow => {
        const insetValue = shadow.inset ? ' inset' : '';
        return `${insetValue} ${shadow.horizontalOffset} ${shadow.verticalOffset} ${shadow.blurRadius} ${shadow.spreadRadius} ${shadow.color}`;
      }).join(', ');
      
      return `box-shadow: ${shadowsCSS};`;
    } else {
      const insetValue = preset.inset ? ' inset' : '';
      return `box-shadow:${insetValue} ${preset.horizontalOffset} ${preset.verticalOffset} ${preset.blurRadius} ${preset.spreadRadius} ${preset.color};`;
    }
  };  // Copy CSS to clipboard
  const copyToClipboard = (css, buttonId) => {
    navigator.clipboard.writeText(css);
    setCopiedButtonId(buttonId);
    toast.success('CSS copied to clipboard!');
    setTimeout(() => setCopiedButtonId(null), 2000);
  };
  // Add shadow layer
  const addShadowLayer = () => {
    if (shadowLayers.length < 4) {
      setShadowLayers([
        ...shadowLayers,
        {
          horizontalOffset: "0px",
          verticalOffset: "2px",
          blurRadius: "4px",
          spreadRadius: "0px",
          color: "rgba(0, 0, 0, 0.1)",
          inset: false
        }
      ]);
      toast.success('Shadow layer added!');
    } else {
      toast.error('Maximum of 4 layers allowed');
    }
  };

  // Remove shadow layer
  const removeShadowLayer = (index) => {
    if (shadowLayers.length > 1) {
      setShadowLayers(shadowLayers.filter((_, i) => i !== index));
      toast.success('Shadow layer removed');
    }
  };
  // Update shadow layer
  const updateShadowLayer = (index, field, value) => {
    const updatedLayers = [...shadowLayers];
    updatedLayers[index] = { ...updatedLayers[index], [field]: value };
    setShadowLayers(updatedLayers);
    
    // Show toast only when changing color or inset, not for position/size changes (to avoid spam)
    if (field === "color" || field === "inset") {
      toast.success(`Shadow ${field} updated!`, { duration: 1000 });
    }
  };

  // Random shadow generator
  const generateRandomShadow = () => {
    const randomPxValue = (min, max) => {
      return `${Math.floor(Math.random() * (max - min + 1)) + min}px`;
    };

    const randomColor = () => {
      const randomOpacity = Math.floor(Math.random() * 30 + 5) / 100;
      return `rgba(0, 0, 0, ${randomOpacity})`;
    };

    if (Math.random() > 0.7) { // 30% chance for multi-shadow
      setMultiShadow(true);
      
      const layerCount = Math.floor(Math.random() * 2) + 2; // 2-3 layers
      const newLayers = [];
      
      for (let i = 0; i < layerCount; i++) {
        newLayers.push({
          horizontalOffset: randomPxValue(-5, 5),
          verticalOffset: randomPxValue(1, 10),
          blurRadius: randomPxValue(3, 15),
          spreadRadius: randomPxValue(-2, 3),
          color: randomColor(),
          inset: Math.random() > 0.85 // 15% chance for inset
        });
      }
      
      setShadowLayers(newLayers);
    } else {
      setMultiShadow(false);
      setHorizontalOffset(randomPxValue(-5, 5));
      setVerticalOffset(randomPxValue(1, 10));
      setBlurRadius(randomPxValue(3, 15));
      setSpreadRadius(randomPxValue(-2, 3));
      setInset(Math.random() > 0.85); // 15% chance for inset
        const newOpacity = Math.floor(Math.random() * 30 + 5);
      setOpacity(newOpacity);
      setShadowColor(`rgba(0, 0, 0, ${newOpacity / 100})`);
    }
    
    setActiveTab("generator");
    toast.success('Random shadow generated!');
  };

  // Load a preset into the generator
  const loadPreset = (preset) => {
    if (preset.multiShadow) {
      setMultiShadow(true);
      setShadowLayers(preset.multiShadow);
    } else {
      setMultiShadow(false);
      setHorizontalOffset(preset.horizontalOffset);
      setVerticalOffset(preset.verticalOffset);
      setBlurRadius(preset.blurRadius);
      setSpreadRadius(preset.spreadRadius);
      setShadowColor(preset.color);
      setInset(preset.inset);
      
      // Extract opacity from rgba
      const opacityMatch = preset.color.match(/rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([0-9.]+)\s*\)/);      if (opacityMatch && opacityMatch[1]) {
        setOpacity(Math.round(parseFloat(opacityMatch[1]) * 100));
      }
    }
    
    setActiveTab("generator");
    toast.success(`Loaded "${preset.name}" preset!`);
  };

  // Update shadow color with opacity
  useEffect(() => {
    if (!multiShadow) {
      const rgbaColor = `rgba(0, 0, 0, ${opacity / 100})`;
      setShadowColor(rgbaColor);
    }
  }, [opacity, multiShadow]);

  // Custom shadow style
  const customShadowStyle = {
    boxShadow: multiShadow 
      ? shadowLayers.map(layer => {
          const insetValue = layer.inset ? 'inset ' : '';
          return `${insetValue}${layer.horizontalOffset} ${layer.verticalOffset} ${layer.blurRadius} ${layer.spreadRadius} ${layer.color}`;
        }).join(', ')
      : `${inset ? 'inset ' : ''}${horizontalOffset} ${verticalOffset} ${blurRadius} ${spreadRadius} ${shadowColor}`
  };

  return (    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Shadow Generator
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
          Preset Shadows
        </button>
        <button
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

      {/* Random shadow button */}
      <div className="mb-6">
        <button
          onClick={generateRandomShadow}
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
        >
          <RefreshCw size={16} className="mr-2" />
          Generate Random Shadow
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
            ))}
          </div>

          {/* Presets grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPresets.map((preset) => {
              // Create shadow style based on preset
              const presetStyle = preset.multiShadow
                ? {
                    boxShadow: preset.multiShadow.map(shadow => {
                      const insetStr = shadow.inset ? 'inset ' : '';
                      return `${insetStr}${shadow.horizontalOffset} ${shadow.verticalOffset} ${shadow.blurRadius} ${shadow.spreadRadius} ${shadow.color}`;
                    }).join(', ')
                  }
                : {
                    boxShadow: `${preset.inset ? 'inset ' : ''}${preset.horizontalOffset} ${preset.verticalOffset} ${preset.blurRadius} ${preset.spreadRadius} ${preset.color}`
                  };

              const presetCSS = getPresetCSS(preset);

              return (                <div
                  key={preset.id}
                  className={`rounded-lg shadow-md overflow-hidden border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}
                >                  <div className="p-6 flex justify-center">
                    <div
                      className={`h-32 w-32 rounded-lg cursor-pointer ${
                        isDarkMode ? 'bg-gray-700' : 'bg-white'
                      }`}
                      style={presetStyle}
                      onClick={() => loadPreset(preset)}
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
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

                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {preset.inset ? 'Inset' : 'Outset'} {preset.multiShadow ? `(${preset.multiShadow.length} layers)` : ''}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(presetCSS, `preset-${preset.id}`);
                        }}
                        className={`${
                          isDarkMode 
                            ? 'text-gray-400 hover:text-gray-300' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">          {/* Preview */}
          <div className="lg:col-span-2">
            <div className={`h-64 flex items-center justify-center rounded-lg mb-4 ${
              isDarkMode ? 'bg-gray-700' : 'bg-white'
            }`}>
              <div
                className={`h-40 w-40 rounded-lg ${
                  isDarkMode ? 'bg-gray-600' : 'bg-white'
                }`}
                style={customShadowStyle}
              />
            </div>

            {/* CSS Output */}
            <div className={`p-4 rounded-md relative mb-4 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <pre className={`text-sm whitespace-pre-wrap ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {generateShadowCSS()}
              </pre>
              <button
                onClick={() => copyToClipboard(generateShadowCSS(), "custom-shadow")}
                className={`absolute top-3 right-3 p-1 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-gray-300' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Copy CSS"
              >
                {copiedButtonId === "custom-shadow" ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">            {/* Shadow Type */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Shadow Type
              </label>
              <div className="flex space-x-4">
                <label className={`inline-flex items-center ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <input
                    type="radio"
                    className="form-radio"
                    value="single"
                    checked={!multiShadow}
                    onChange={() => {
                      setMultiShadow(false);
                      toast.success('Switched to single shadow mode');
                    }}
                  />
                  <span className="ml-2">Single Shadow</span>
                </label>
                <label className={`inline-flex items-center ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <input
                    type="radio"
                    className="form-radio"
                    value="multi"
                    checked={multiShadow}
                    onChange={() => {
                      setMultiShadow(true);
                      toast.success('Switched to multi-layer shadow mode');
                    }}
                  />
                  <span className="ml-2">Multi-Layer Shadow</span>
                </label>
              </div>
            </div>

            {!multiShadow ? (
              // Single Shadow Controls
              <>                {/* Inset Checkbox */}
                <div>
                  <label className={`inline-flex items-center text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <input
                      type="checkbox"
                      className="form-checkbox rounded"
                      checked={inset}
                      onChange={(e) => {
                        setInset(e.target.checked);
                        toast.success(e.target.checked ? 'Set to inset shadow' : 'Set to outset shadow', { duration: 1000 });
                      }}
                    />
                    <span className="ml-2">Inset Shadow</span>
                  </label>
                </div>
                
                {/* Horizontal Offset */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Horizontal Offset
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={parseInt(horizontalOffset)}
                      onChange={(e) => setHorizontalOffset(`${e.target.value}px`)}
                      className="w-full mr-3"
                    />
                    <span className={`text-sm w-12 text-right ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {horizontalOffset}
                    </span>
                  </div>
                </div>
                
                {/* Vertical Offset */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Vertical Offset
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={parseInt(verticalOffset)}
                      onChange={(e) => setVerticalOffset(`${e.target.value}px`)}
                      className="w-full mr-3"
                    />
                    <span className={`text-sm w-12 text-right ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {verticalOffset}
                    </span>
                  </div>
                </div>
                
                {/* Blur Radius */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Blur Radius
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={parseInt(blurRadius)}
                      onChange={(e) => setBlurRadius(`${e.target.value}px`)}
                      className="w-full mr-3"
                    />
                    <span className={`text-sm w-12 text-right ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {blurRadius}
                    </span>
                  </div>
                </div>
                
                {/* Spread Radius */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Spread Radius
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="-25"
                      max="25"
                      value={parseInt(spreadRadius)}
                      onChange={(e) => setSpreadRadius(`${e.target.value}px`)}
                      className="w-full mr-3"
                    />
                    <span className={`text-sm w-12 text-right ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {spreadRadius}
                    </span>
                  </div>
                </div>
                
                {/* Shadow Opacity */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Opacity
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={opacity}
                      onChange={(e) => setOpacity(parseInt(e.target.value))}
                      className="w-full mr-3"
                    />
                    <span className={`text-sm w-12 text-right ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {opacity}%
                    </span>
                  </div>
                </div>
              </>            ) : (
              // Multi-Shadow Controls
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Shadow Layers
                  </label>
                  {shadowLayers.length < 4 && (
                    <button
                      onClick={addShadowLayer}
                      className={`text-xs px-2 py-1 rounded ${
                        isDarkMode 
                          ? 'bg-blue-900 hover:bg-blue-800 text-blue-200' 
                          : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                      }`}
                    >
                      Add Layer
                    </button>
                  )}
                </div>

                {shadowLayers.map((layer, index) => (
                  <div key={index} className={`mb-6 p-4 border rounded-lg ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`font-medium text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Layer {index + 1}</span>
                      {shadowLayers.length > 1 && (
                        <button
                          onClick={() => removeShadowLayer(index)}
                          className={`text-xs px-2 py-1 rounded ${
                            isDarkMode 
                              ? 'bg-red-900 hover:bg-red-800 text-red-200' 
                              : 'bg-red-100 hover:bg-red-200 text-red-700'
                          }`}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    {/* Inset Checkbox */}
                    <div className="mb-3">
                      <label className={`inline-flex items-center text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          className="form-checkbox rounded"
                          checked={layer.inset}
                          onChange={(e) => updateShadowLayer(index, 'inset', e.target.checked)}
                        />
                        <span className="ml-2">Inset Shadow</span>
                      </label>
                    </div>
                    
                    {/* Color */}
                    <div className="mb-3">
                      <label className={`block text-sm mb-1 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Color
                      </label>
                      <input
                        type="text"
                        value={layer.color}
                        onChange={(e) => updateShadowLayer(index, 'color', e.target.value)}
                        className={`w-full border rounded-md py-1 px-2 text-sm ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    
                    {/* Horizontal Offset */}
                    <div className="mb-2">
                      <label className={`block text-xs mb-1 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Horizontal Offset: {layer.horizontalOffset}
                      </label>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        value={parseInt(layer.horizontalOffset)}
                        onChange={(e) => updateShadowLayer(index, 'horizontalOffset', `${e.target.value}px`)}
                        className="w-full"
                      />
                    </div>
                    
                    {/* Vertical Offset */}
                    <div className="mb-2">
                      <label className={`block text-xs mb-1 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Vertical Offset: {layer.verticalOffset}
                      </label>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        value={parseInt(layer.verticalOffset)}
                        onChange={(e) => updateShadowLayer(index, 'verticalOffset', `${e.target.value}px`)}
                        className="w-full"
                      />
                    </div>
                    
                    {/* Blur Radius */}
                    <div className="mb-2">
                      <label className={`block text-xs mb-1 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Blur Radius: {layer.blurRadius}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={parseInt(layer.blurRadius)}
                        onChange={(e) => updateShadowLayer(index, 'blurRadius', `${e.target.value}px`)}
                        className="w-full"
                      />
                    </div>
                    
                    {/* Spread Radius */}
                    <div className="mb-2">
                      <label className={`block text-xs mb-1 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Spread Radius: {layer.spreadRadius}
                      </label>
                      <input
                        type="range"
                        min="-25"
                        max="25"
                        value={parseInt(layer.spreadRadius)}
                        onChange={(e) => updateShadowLayer(index, 'spreadRadius', `${e.target.value}px`)}
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShadowGenerator;