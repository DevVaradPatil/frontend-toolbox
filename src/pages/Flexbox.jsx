// src/pages/Flexbox.jsx
import { useState } from "react";
import { Copy, Check, RefreshCw, LayoutGrid, X, CheckSquare, Square } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Flexbox = () => {
  const { isDarkMode } = useTheme();
  const [copied, setCopied] = useState(false);

  // Container properties
  const [flexDirection, setFlexDirection] = useState("row");
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [flexWrap, setFlexWrap] = useState("nowrap");
  const [gap, setGap] = useState(10);
  
  // Container style
  const [containerBg, setContainerBg] = useState("#f3f4f6");
  const [containerHeight, setContainerHeight] = useState(400);
  
  // Items properties
  const [items, setItems] = useState([
    { id: 1, width: 100, height: 100, color: "#3b82f6", alignSelf: "auto", flexGrow: 0, flexShrink: 1, order: 0 },
    { id: 2, width: 100, height: 150, color: "#10b981", alignSelf: "auto", flexGrow: 0, flexShrink: 1, order: 0 },
    { id: 3, width: 100, height: 80, color: "#f59e0b", alignSelf: "auto", flexGrow: 0, flexShrink: 1, order: 0 }
  ]);
  const [selectedItems, setSelectedItems] = useState([1]);
  const [multiSelectActive, setMultiSelectActive] = useState(false);

  // Generate CSS for container
  const generateContainerCSS = () => {
    return `/* Container */
display: flex;
flex-direction: ${flexDirection};
justify-content: ${justifyContent};
align-items: ${alignItems};
flex-wrap: ${flexWrap};
gap: ${gap}px;`;
  };

  // Generate CSS for items
  const generateItemsCSS = () => {
    const itemCSS = items.map(item => {
      let css = `/* Item ${item.id} */
width: ${item.width}px;
height: ${item.height}px;
background-color: ${item.color};`;

      if (item.alignSelf !== "auto") {
        css += `\nalign-self: ${item.alignSelf};`;
      }
      if (item.flexGrow !== 0) {
        css += `\nflex-grow: ${item.flexGrow};`;
      }
      if (item.flexShrink !== 1) {
        css += `\nflex-shrink: ${item.flexShrink};`;
      }
      if (item.order !== 0) {
        css += `\norder: ${item.order};`;
      }

      return css;
    });

    return itemCSS.join("\n\n");
  };

  // Container style
  const containerStyle = {
    display: "flex",
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    gap: `${gap}px`,
    backgroundColor: containerBg,
    height: `${containerHeight}px`,
    padding: "20px",
    borderRadius: "8px",
    overflow: "auto"
  };

  // Copy CSS to clipboard
  const copyToClipboard = () => {
    const css = `${generateContainerCSS()}\n\n${generateItemsCSS()}`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  // Add a new item
  const addItem = () => {
    if (items.length < 8) {  // Maximum 8 items
      // Generate a random color
      const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];
      const newId = Math.max(...items.map(item => item.id)) + 1;
      
      setItems([...items, {
        id: newId,
        width: Math.floor(Math.random() * 50) + 70, // Random width between 70-120
        height: Math.floor(Math.random() * 70) + 70, // Random height between 70-140
        color: colors[Math.floor(Math.random() * colors.length)],
        alignSelf: "auto",
        flexGrow: 0,
        flexShrink: 1,
        order: 0
      }]);

      if (!multiSelectActive) {
        setSelectedItems([newId]);
      } else {
        setSelectedItems(prev => [...prev, newId]);
      }
    }
  };

  // Remove selected items
  const removeItem = () => {
    if (items.length > selectedItems.length && items.length - selectedItems.length >= 1) {
      const newItems = items.filter(item => !selectedItems.includes(item.id));
      setItems(newItems);
      setSelectedItems([newItems[0].id]);
    }
  };
  // Update item property for all selected items
  const updateItemProperty = (property, value) => {
    const updatedItems = items.map(item => {
      if (selectedItems.includes(item.id)) {
        return { ...item, [property]: value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // Get the first selected item (for UI display when multiple items are selected)
  const getSelectedItem = () => {
    return items.find(item => item.id === selectedItems[0]);
  };
  
  // Toggle item selection
  const toggleItemSelection = (id, event) => {
    if (multiSelectActive || event.shiftKey) {
      setSelectedItems(prev => 
        prev.includes(id) 
          ? prev.filter(itemId => itemId !== id) 
          : [...prev, id]
      );
    } else {
      setSelectedItems([id]);
    }
  };
  
  // Check if an item is selected
  const isItemSelected = (id) => {
    return selectedItems.includes(id);
  };

  // Generate a random layout
  const generateRandomLayout = () => {
    // Random container properties
    const directions = ["row", "row-reverse", "column", "column-reverse"];
    const justifyOptions = ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"];
    const alignOptions = ["flex-start", "flex-end", "center", "stretch", "baseline"];
    const wrapOptions = ["nowrap", "wrap", "wrap-reverse"];
    
    setFlexDirection(directions[Math.floor(Math.random() * directions.length)]);
    setJustifyContent(justifyOptions[Math.floor(Math.random() * justifyOptions.length)]);
    setAlignItems(alignOptions[Math.floor(Math.random() * alignOptions.length)]);
    setFlexWrap(wrapOptions[Math.floor(Math.random() * wrapOptions.length)]);
    setGap(Math.floor(Math.random() * 30));
    
    // Random item properties
    const alignSelfOptions = ["auto", "flex-start", "flex-end", "center", "stretch", "baseline"];
    const updatedItems = items.map(item => {
      return {
        ...item,
        alignSelf: Math.random() > 0.7 ? alignSelfOptions[Math.floor(Math.random() * alignSelfOptions.length)] : "auto",
        flexGrow: Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0,
        flexShrink: Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 1,
        order: Math.random() > 0.7 ? Math.floor(Math.random() * 5) - 2 : 0
      };
    });
    
    setItems(updatedItems);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className={`text-3xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Flexbox Playground
      </h1>      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={addItem}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          disabled={items.length >= 8}
        >
          Add Item
        </button>
        <button
          onClick={removeItem}
          className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
          disabled={items.length <= 1 || selectedItems.length === 0}
        >
          Remove {selectedItems.length > 1 ? `Items (${selectedItems.length})` : 'Item'}
        </button>
        <button
          onClick={() => setMultiSelectActive(!multiSelectActive)}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            multiSelectActive 
              ? 'bg-indigo-700 hover:bg-indigo-800 text-white' 
              : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`
          }`}
        >          {multiSelectActive ? <CheckSquare size={16} className="mr-2" /> : <Square size={16} className="mr-2" />}
          Multi-Select
        </button>
        {selectedItems.length > 1 && (
          <button
            onClick={() => setSelectedItems([selectedItems[0]])}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Clear Selection
          </button>
        )}
        <button
          onClick={generateRandomLayout}
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors ml-auto"
        >
          <RefreshCw size={16} className="mr-2" />
          Random Layout
        </button>
      </div>      {/* Item tags display */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className={`text-sm mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {multiSelectActive 
            ? "Click to select multiple items or" 
            : "Click to select an item or hold Shift for multi-select"}:
        </div>
        {items.map(item => (
          <div 
            key={item.id}
            onClick={(e) => toggleItemSelection(item.id, e)}
            className={`flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              isItemSelected(item.id)
                ? 'bg-blue-600 text-white'
                : `${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`
            }`}
            style={{ borderLeft: `4px solid ${item.color}` }}
          >
            Item {item.id}
            {isItemSelected(item.id) && (
              <X size={14} className="ml-2 opacity-70 hover:opacity-100" />
            )}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preview */}
        <div className="lg:col-span-2">
          <div
            style={containerStyle}
            className={`mb-4 border ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            }`}
          >            {items.map(item => (
              <div
                key={item.id}
                style={{
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                  backgroundColor: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  cursor: "pointer",
                  boxShadow: isItemSelected(item.id) ? "0 0 0 3px rgba(255,255,255,0.7)" : "none",
                  outline: isItemSelected(item.id) ? "2px dashed rgba(255,255,255,0.9)" : "none",
                  outlineOffset: "2px",
                  alignSelf: item.alignSelf,
                  flexGrow: item.flexGrow,
                  flexShrink: item.flexShrink,
                  order: item.order,
                  transition: "all 0.2s"
                }}
                onClick={(e) => toggleItemSelection(item.id, e)}
                title={`Item ${item.id}${isItemSelected(item.id) ? " (Selected)" : ""}`}
              >
                {item.id}
              </div>
            ))}
          </div>

          {/* CSS Output */}
          <div className={`p-4 rounded-md relative mb-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <pre className={`text-sm whitespace-pre-wrap ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {generateContainerCSS()}
              {"\n\n"}
              {generateItemsCSS()}
            </pre>
            <button
              onClick={copyToClipboard}
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
          {/* Container Properties */}
          <div className={`p-4 rounded-md border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-medium mb-4 flex items-center ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <LayoutGrid size={16} className="mr-2" />
              Container Properties
            </h3>

            {/* Flex Direction */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                flex-direction
              </label>
              <select
                value={flexDirection}
                onChange={(e) => setFlexDirection(e.target.value)}
                className={`w-full rounded-md py-2 px-3 text-sm border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              >
                <option value="row">row</option>
                <option value="row-reverse">row-reverse</option>
                <option value="column">column</option>
                <option value="column-reverse">column-reverse</option>
              </select>
            </div>

            {/* Justify Content */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                justify-content
              </label>
              <select
                value={justifyContent}
                onChange={(e) => setJustifyContent(e.target.value)}
                className={`w-full rounded-md py-2 px-3 text-sm border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              >
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="center">center</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
                <option value="space-evenly">space-evenly</option>
              </select>
            </div>

            {/* Align Items */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                align-items
              </label>
              <select
                value={alignItems}
                onChange={(e) => setAlignItems(e.target.value)}
                className={`w-full rounded-md py-2 px-3 text-sm border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              >
                <option value="stretch">stretch</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="center">center</option>
                <option value="baseline">baseline</option>
              </select>
            </div>

            {/* Flex Wrap */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                flex-wrap
              </label>
              <select
                value={flexWrap}
                onChange={(e) => setFlexWrap(e.target.value)}
                className={`w-full rounded-md py-2 px-3 text-sm border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              >
                <option value="nowrap">nowrap</option>
                <option value="wrap">wrap</option>
                <option value="wrap-reverse">wrap-reverse</option>
              </select>
            </div>

            {/* Gap */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <label className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  gap
                </label>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {gap}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={gap}
                onChange={(e) => setGap(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Container Background */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Container Background
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={containerBg}
                  onChange={(e) => setContainerBg(e.target.value)}
                  className="w-10 h-10 p-0 rounded-md border-0"
                />
                <input
                  type="text"
                  value={containerBg}
                  onChange={(e) => setContainerBg(e.target.value)}
                  className={`flex-1 rounded-md py-1 px-2 text-sm border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            {/* Container Height */}
            <div>
              <div className="flex justify-between mb-1">
                <label className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Container Height
                </label>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {containerHeight}px
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="600"
                value={containerHeight}
                onChange={(e) => setContainerHeight(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Item Properties - only shown if an item is selected */}
          {selectedItems.length > 0 && (
            <div className={`p-4 rounded-md border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h3 className={`font-medium mb-4 flex items-center ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {selectedItems.length === 1 ? (
                  <>
                    <div 
                      className="w-4 h-4 mr-2 rounded-sm" 
                      style={{ backgroundColor: getSelectedItem()?.color || '#000' }}
                    />
                    Item {selectedItems[0]} Properties
                  </>
                ) : (
                  <>
                    <div className="flex -space-x-1 mr-2">
                      {selectedItems.slice(0, 3).map(id => (
                        <div
                          key={id}
                          className="w-4 h-4 rounded-sm border-2 border-white dark:border-gray-800"
                          style={{ backgroundColor: items.find(item => item.id === id)?.color || '#000' }}
                        />
                      ))}
                      {selectedItems.length > 3 && (
                        <div className={`w-5 h-4 rounded-sm flex items-center justify-center text-xs ${
                          isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                        }`}>
                          +{selectedItems.length - 3}
                        </div>
                      )}
                    </div>
                    {selectedItems.length} Items Selected
                  </>
                )}
              </h3>

              {/* Width and Height */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Width
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="50"
                      max="200"
                      value={getSelectedItem()?.width || 100}
                      onChange={(e) => updateItemProperty('width', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <span className={`text-sm w-12 text-right ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {getSelectedItem()?.width || 100}px
                    </span>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Height
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="50"
                      max="200"
                      value={getSelectedItem()?.height || 100}
                      onChange={(e) => updateItemProperty('height', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <span className={`text-sm w-12 text-right ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {getSelectedItem()?.height || 100}px
                    </span>
                  </div>
                </div>
              </div>

              {/* Align Self */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  align-self
                </label>
                <select
                  value={getSelectedItem()?.alignSelf || "auto"}
                  onChange={(e) => updateItemProperty('alignSelf', e.target.value)}
                  className={`w-full rounded-md py-2 px-3 text-sm border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="auto">auto</option>
                  <option value="flex-start">flex-start</option>
                  <option value="flex-end">flex-end</option>
                  <option value="center">center</option>
                  <option value="stretch">stretch</option>
                  <option value="baseline">baseline</option>
                </select>
              </div>

              {/* Flex Grow and Shrink */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    flex-grow
                  </label>
                  <select
                    value={getSelectedItem()?.flexGrow || 0}
                    onChange={(e) => updateItemProperty('flexGrow', parseInt(e.target.value))}
                    className={`w-full rounded-md py-2 px-3 text-sm border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    flex-shrink
                  </label>
                  <select
                    value={getSelectedItem()?.flexShrink || 1}
                    onChange={(e) => updateItemProperty('flexShrink', parseInt(e.target.value))}
                    className={`w-full rounded-md py-2 px-3 text-sm border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                </div>
              </div>

              {/* Order */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  order
                </label>
                <input
                  type="number"
                  min="-5"
                  max="5"
                  value={getSelectedItem()?.order || 0}
                  onChange={(e) => updateItemProperty('order', parseInt(e.target.value))}
                  className={`w-full rounded-md py-2 px-3 text-sm border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              {/* Color */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Background Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={getSelectedItem()?.color || "#3b82f6"}
                    onChange={(e) => updateItemProperty('color', e.target.value)}
                    className="w-10 h-10 p-0 rounded-md border-0"
                  />
                  <input
                    type="text"
                    value={getSelectedItem()?.color || "#3b82f6"}
                    onChange={(e) => updateItemProperty('color', e.target.value)}
                    className={`flex-1 rounded-md py-1 px-2 text-sm border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flexbox;
