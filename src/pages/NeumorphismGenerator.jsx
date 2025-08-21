import React, { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const NeumorphismGenerator = () => {
  const { isDarkMode } = useTheme();
  const [copiedId, setCopiedId] = useState(null);

  // Neumorphism state
  const [settings, setSettings] = useState({
    backgroundColor: '#e0e5ec',
    lightShadow: '#ffffff',
    darkShadow: '#c8d0e7',
    distance: 6,
    intensity: 1,
    blur: 12,
    borderRadius: 12,
    size: 200,
    shape: 'square',
    style: 'raised', // raised, inset, flat
    padding: 20
  });

  // Generate CSS for neumorphism
  const generateNeumorphismCSS = () => {
    const { backgroundColor, lightShadow, darkShadow, distance, intensity, blur, borderRadius, size, shape, style, padding } = settings;
    
    let boxShadow = '';
    const adjustedDistance = distance * intensity;
    const adjustedBlur = blur * intensity;
    
    switch (style) {
      case 'raised':
        boxShadow = `${adjustedDistance}px ${adjustedDistance}px ${adjustedBlur}px ${darkShadow}, -${adjustedDistance}px -${adjustedDistance}px ${adjustedBlur}px ${lightShadow}`;
        break;
      case 'inset':
        boxShadow = `inset ${adjustedDistance}px ${adjustedDistance}px ${adjustedBlur}px ${darkShadow}, inset -${adjustedDistance}px -${adjustedDistance}px ${adjustedBlur}px ${lightShadow}`;
        break;
      case 'flat':
        boxShadow = `${adjustedDistance}px ${adjustedDistance}px ${adjustedBlur}px ${darkShadow}`;
        break;
      default:
        boxShadow = `${adjustedDistance}px ${adjustedDistance}px ${adjustedBlur}px ${darkShadow}, -${adjustedDistance}px -${adjustedDistance}px ${adjustedBlur}px ${lightShadow}`;
    }

    const css = `background: ${backgroundColor};
border-radius: ${borderRadius}px;
box-shadow: ${boxShadow};
width: ${size}px;
height: ${size === 'auto' ? 'auto' : size + 'px'};
padding: ${padding}px;${shape === 'circle' ? `\nborder-radius: 50%;` : ''}`;

    return css;
  };

  // Generate random neumorphism
  const generateRandomNeumorphism = () => {
    const colors = [
      { bg: '#e0e5ec', light: '#ffffff', dark: '#c8d0e7' }, // Light gray
      { bg: '#f0f0f3', light: '#ffffff', dark: '#d1d9e6' }, // Very light gray
      { bg: '#e8e8e8', light: '#ffffff', dark: '#c5c5c5' }, // Medium gray
      { bg: '#f5f5f5', light: '#ffffff', dark: '#d4d4d4' }, // Light white
      { bg: '#ececec', light: '#ffffff', dark: '#c9c9c9' }, // Neutral gray
      { bg: '#e3e3e3', light: '#ffffff', dark: '#c0c0c0' }, // Classic neumorphism
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const shapes = ['square', 'circle'];
    const styles = ['raised', 'inset', 'flat'];

    setSettings({
      backgroundColor: randomColor.bg,
      lightShadow: randomColor.light,
      darkShadow: randomColor.dark,
      distance: Math.floor(Math.random() * 15) + 3, // 3-17
      intensity: Math.random() * 1.5 + 0.5, // 0.5-2
      blur: Math.floor(Math.random() * 20) + 8, // 8-27
      borderRadius: Math.floor(Math.random() * 25) + 5, // 5-29
      size: Math.floor(Math.random() * 150) + 150, // 150-299
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      style: styles[Math.floor(Math.random() * styles.length)],
      padding: Math.floor(Math.random() * 30) + 10 // 10-39
    });

    toast.success('Random neumorphism generated!');
  };

  // Copy CSS to clipboard
  const copyToClipboard = (css, id) => {
    navigator.clipboard.writeText(css);
    setCopiedId(id);
    toast.success('CSS copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Update setting
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Generate style object for preview
  const previewStyle = {
    background: settings.backgroundColor,
    borderRadius: settings.shape === 'circle' ? '50%' : `${settings.borderRadius}px`,
    boxShadow: (() => {
      const { darkShadow, lightShadow, distance, intensity, blur, style } = settings;
      const adjustedDistance = distance * intensity;
      const adjustedBlur = blur * intensity;
      
      switch (style) {
        case 'raised':
          return `${adjustedDistance}px ${adjustedDistance}px ${adjustedBlur}px ${darkShadow}, -${adjustedDistance}px -${adjustedDistance}px ${adjustedBlur}px ${lightShadow}`;
        case 'inset':
          return `inset ${adjustedDistance}px ${adjustedDistance}px ${adjustedBlur}px ${darkShadow}, inset -${adjustedDistance}px -${adjustedDistance}px ${adjustedBlur}px ${lightShadow}`;
        case 'flat':
          return `${adjustedDistance}px ${adjustedDistance}px ${adjustedBlur}px ${darkShadow}`;
        default:
          return `${adjustedDistance}px ${adjustedDistance}px ${adjustedBlur}px ${darkShadow}, -${adjustedDistance}px -${adjustedDistance}px ${adjustedBlur}px ${lightShadow}`;
      }
    })(),
    width: `${settings.size}px`,
    height: `${settings.size}px`,
    padding: `${settings.padding}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontSize: '14px',
    fontWeight: '500'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Neumorphism Generator
      </h1>

      {/* Random generator button */}
      <div className="mb-6">
        <button
          onClick={generateRandomNeumorphism}
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
        >
          <RefreshCw size={16} className="mr-2" />
          Generate Random Neumorphism
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preview */}
        <div className="lg:col-span-2">
          <div 
            className="flex items-center justify-center min-h-[300px] p-8 rounded-lg"
            style={{ backgroundColor: settings.backgroundColor }}
          >
            <div style={previewStyle}>
              Neumorphism
            </div>
          </div>

          {/* CSS Output */}
          <div className={`p-4 rounded-md relative mt-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <pre className={`text-sm whitespace-pre-wrap ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {generateNeumorphismCSS()}
            </pre>
            <button
              onClick={() => copyToClipboard(generateNeumorphismCSS(), "neumorphism-css")}
              className={`absolute top-3 right-3 p-1 ${
                isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Copy CSS"
            >
              {copiedId === "neumorphism-css" ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Colors */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Background Color
            </label>
            <input
              type="color"
              value={settings.backgroundColor}
              onChange={(e) => updateSetting('backgroundColor', e.target.value)}
              className="w-full h-10 rounded-md border-0"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Light Shadow Color
            </label>
            <input
              type="color"
              value={settings.lightShadow}
              onChange={(e) => updateSetting('lightShadow', e.target.value)}
              className="w-full h-10 rounded-md border-0"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Dark Shadow Color
            </label>
            <input
              type="color"
              value={settings.darkShadow}
              onChange={(e) => updateSetting('darkShadow', e.target.value)}
              className="w-full h-10 rounded-md border-0"
            />
          </div>

          {/* Shape */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Shape
            </label>
            <div className="flex space-x-4">
              <label className={`inline-flex items-center ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <input
                  type="radio"
                  className="form-radio"
                  value="square"
                  checked={settings.shape === "square"}
                  onChange={() => updateSetting('shape', 'square')}
                />
                <span className="ml-2">Square</span>
              </label>
              <label className={`inline-flex items-center ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <input
                  type="radio"
                  className="form-radio"
                  value="circle"
                  checked={settings.shape === "circle"}
                  onChange={() => updateSetting('shape', 'circle')}
                />
                <span className="ml-2">Circle</span>
              </label>
            </div>
          </div>

          {/* Style */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Style
            </label>
            <select
              className={`w-full rounded-md py-2 px-3 text-sm border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              value={settings.style}
              onChange={(e) => updateSetting('style', e.target.value)}
            >
              <option value="raised">Raised</option>
              <option value="inset">Inset</option>
              <option value="flat">Flat</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Size: {settings.size}px
            </label>
            <input
              type="range"
              min="100"
              max="400"
              value={settings.size}
              onChange={(e) => updateSetting('size', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Border Radius (only for square) */}
          {settings.shape === 'square' && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Border Radius: {settings.borderRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={settings.borderRadius}
                onChange={(e) => updateSetting('borderRadius', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {/* Distance */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Distance: {settings.distance}px
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={settings.distance}
              onChange={(e) => updateSetting('distance', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Intensity */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Intensity: {settings.intensity.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={settings.intensity}
              onChange={(e) => updateSetting('intensity', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Blur */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Blur: {settings.blur}px
            </label>
            <input
              type="range"
              min="0"
              max="30"
              value={settings.blur}
              onChange={(e) => updateSetting('blur', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Padding */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Padding: {settings.padding}px
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={settings.padding}
              onChange={(e) => updateSetting('padding', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeumorphismGenerator;
