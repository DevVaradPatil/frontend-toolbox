// src/pages/CSSGrid.jsx
import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Trash,
  Plus,
  GanttChart,
  RefreshCw,
  Grid,
  Eye,
  EyeOff,
  Download,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const CSSGrid = () => {
  const { isDarkMode } = useTheme();
  const [copied, setCopied] = useState(false);
  const [codeType, setCodeType] = useState("css");
  const [showGridLines, setShowGridLines] = useState(true);

  // Grid container properties
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [rowGap, setRowGap] = useState(10);
  const [columnGap, setColumnGap] = useState(10);
  const [containerWidth, setContainerWidth] = useState(600);
  const [containerHeight, setContainerHeight] = useState(400);
  const [containerBg, setContainerBg] = useState("#f3f4f6");

  // Grid template definitions
  const [rowTemplate, setRowTemplate] = useState("1fr 1fr 1fr");
  const [columnTemplate, setColumnTemplate] = useState("1fr 1fr 1fr");
  // Grid areas and items
  const [showAreas, setShowAreas] = useState(false);
  const [gridItems, setGridItems] = useState([
    {
      id: 1,
      name: "Header",
      color: "#3b82f6",
      rowStart: 1,
      rowEnd: 2,
      colStart: 1,
      colEnd: 4,
    },
    {
      id: 2,
      name: "Sidebar",
      color: "#10b981",
      rowStart: 2,
      rowEnd: 4,
      colStart: 1,
      colEnd: 2,
    },
    {
      id: 3,
      name: "Content",
      color: "#f59e0b",
      rowStart: 2,
      rowEnd: 4,
      colStart: 2,
      colEnd: 4,
    },
  ]);
  const [selectedItem, setSelectedItem] = useState(1);

  // Layout presets
  const presets = [
    {
      name: "Basic Grid (3x3)",
      rows: "1fr 1fr 1fr",
      columns: "1fr 1fr 1fr",
      items: [
        {
          id: 1,
          name: "Item 1",
          color: "#3b82f6",
          rowStart: 1,
          rowEnd: 2,
          colStart: 1,
          colEnd: 2,
        },
        {
          id: 2,
          name: "Item 2",
          color: "#10b981",
          rowStart: 1,
          rowEnd: 2,
          colStart: 2,
          colEnd: 3,
        },
        {
          id: 3,
          name: "Item 3",
          color: "#f59e0b",
          rowStart: 1,
          rowEnd: 2,
          colStart: 3,
          colEnd: 4,
        },
        {
          id: 4,
          name: "Item 4",
          color: "#ef4444",
          rowStart: 2,
          rowEnd: 3,
          colStart: 1,
          colEnd: 2,
        },
        {
          id: 5,
          name: "Item 5",
          color: "#8b5cf6",
          rowStart: 2,
          rowEnd: 3,
          colStart: 2,
          colEnd: 3,
        },
        {
          id: 6,
          name: "Item 6",
          color: "#ec4899",
          rowStart: 2,
          rowEnd: 3,
          colStart: 3,
          colEnd: 4,
        },
        {
          id: 7,
          name: "Item 7",
          color: "#14b8a6",
          rowStart: 3,
          rowEnd: 4,
          colStart: 1,
          colEnd: 2,
        },
        {
          id: 8,
          name: "Item 8",
          color: "#f97316",
          rowStart: 3,
          rowEnd: 4,
          colStart: 2,
          colEnd: 3,
        },
        {
          id: 9,
          name: "Item 9",
          color: "#a855f7",
          rowStart: 3,
          rowEnd: 4,
          colStart: 3,
          colEnd: 4,
        },
      ],
    },
    {
      name: "Classic Layout",
      rows: "100px 1fr 50px",
      columns: "1fr 4fr",
      items: [
        {
          id: 1,
          name: "Header",
          color: "#3b82f6",
          rowStart: 1,
          rowEnd: 2,
          colStart: 1,
          colEnd: 3,
        },
        {
          id: 2,
          name: "Sidebar",
          color: "#10b981",
          rowStart: 2,
          rowEnd: 3,
          colStart: 1,
          colEnd: 2,
        },
        {
          id: 3,
          name: "Content",
          color: "#f59e0b",
          rowStart: 2,
          rowEnd: 3,
          colStart: 2,
          colEnd: 3,
        },
        {
          id: 4,
          name: "Footer",
          color: "#ef4444",
          rowStart: 3,
          rowEnd: 4,
          colStart: 1,
          colEnd: 3,
        },
      ],
    },
    {
      name: "Dashboard",
      rows: "80px repeat(2, 1fr) 80px",
      columns: "repeat(4, 1fr)",
      items: [
        {
          id: 1,
          name: "Header",
          color: "#3b82f6",
          rowStart: 1,
          rowEnd: 2,
          colStart: 1,
          colEnd: 5,
        },
        {
          id: 2,
          name: "Sidebar",
          color: "#10b981",
          rowStart: 2,
          rowEnd: 4,
          colStart: 1,
          colEnd: 2,
        },
        {
          id: 3,
          name: "Main Content",
          color: "#f59e0b",
          rowStart: 2,
          rowEnd: 3,
          colStart: 2,
          colEnd: 4,
        },
        {
          id: 4,
          name: "Stats",
          color: "#ef4444",
          rowStart: 2,
          rowEnd: 3,
          colStart: 4,
          colEnd: 5,
        },
        {
          id: 5,
          name: "Chart 1",
          color: "#8b5cf6",
          rowStart: 3,
          rowEnd: 4,
          colStart: 2,
          colEnd: 3,
        },
        {
          id: 6,
          name: "Chart 2",
          color: "#ec4899",
          rowStart: 3,
          rowEnd: 4,
          colStart: 3,
          colEnd: 5,
        },
        {
          id: 7,
          name: "Footer",
          color: "#14b8a6",
          rowStart: 4,
          rowEnd: 5,
          colStart: 1,
          colEnd: 5,
        },
      ],
    },
  ];
  // Load preset layout
  const loadPreset = (preset) => {
    setRowTemplate(preset.rows);
    setColumnTemplate(preset.columns);
    setGridItems([...preset.items]);
    setSelectedItem(preset.items[0].id);
  };

  // Update rows and columns counts when templates change
  useEffect(() => {
    const rowCount = rowTemplate.split(/\s+/).length;
    setRows(rowCount);
  }, [rowTemplate]);

  useEffect(() => {
    const colCount = columnTemplate.split(/\s+/).length;
    setColumns(colCount);
  }, [columnTemplate]);

  // Generate grid-template values
  const generateRowTemplate = () => {
    if (rowTemplate.trim() !== "") return rowTemplate;
    return Array(rows).fill("1fr").join(" ");
  };

  const generateColumnTemplate = () => {
    if (columnTemplate.trim() !== "") return columnTemplate;
    return Array(columns).fill("1fr").join(" ");
  };
  // Generate CSS for container
  const generateContainerCSS = () => {
    if (codeType === "css") {
      return `/* Grid Container */
display: grid;
grid-template-rows: ${generateRowTemplate()};
grid-template-columns: ${generateColumnTemplate()};
row-gap: ${rowGap}px;
column-gap: ${columnGap}px;
width: ${containerWidth}px;
height: ${containerHeight}px;
${
  showGridLines
    ? "background-size: 50px 50px;\nbackground-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);"
    : ""
}`;
    } else {
      // Tailwind classes
      return `/* Tailwind CSS Grid Container */
grid
grid-rows-[${generateRowTemplate()}]
grid-cols-[${generateColumnTemplate()}]
gap-y-[${rowGap}px]
gap-x-[${columnGap}px]
w-[${containerWidth}px]
h-[${containerHeight}px]${
        showGridLines
          ? `
bg-[size:50px_50px]
bg-[image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]`
          : ""
      }`;
    }
  };

  // Generate CSS for items
  const generateItemsCSS = () => {
    return gridItems
      .map((item) => {
        if (codeType === "css") {
          return `/* Item: ${item.name} */
grid-row: ${item.rowStart} / ${item.rowEnd};
grid-column: ${item.colStart} / ${item.colEnd};
background-color: ${item.color};`;
        } else {
          return `/* Item: ${item.name} (Tailwind) */
row-start-${item.rowStart} row-end-${item.rowEnd}
col-start-${item.colStart} col-end-${item.colEnd}
bg-[${item.color}]`;
        }
      })
      .join("\n\n");
  };
  // Container style
  const containerStyle = {
    display: "grid",
    gridTemplateRows: generateRowTemplate(),
    gridTemplateColumns: generateColumnTemplate(),
    rowGap: `${rowGap}px`,
    columnGap: `${columnGap}px`,
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    backgroundColor: containerBg,
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundSize: showGridLines ? "50px 50px" : "0 0",
    backgroundImage: showGridLines
      ? "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)"
      : "none",
  };
  // Export CSS and HTML
  const exportFullCode = () => {
    // Create HTML representation
    const htmlItems = gridItems
      .map((item) => {
        return `<div class="grid-item ${item.name
          .toLowerCase()
          .replace(/\s+/g, "-")}" style="grid-row: ${item.rowStart} / ${
          item.rowEnd
        }; grid-column: ${item.colStart} / ${item.colEnd}; background-color: ${
          item.color
        };">${item.name}</div>`;
      })
      .join("\n  ");

    const htmlAndCss = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Grid Layout</title>
  <style>
    .grid-container {
      display: grid;
      grid-template-rows: ${generateRowTemplate()};
      grid-template-columns: ${generateColumnTemplate()};
      row-gap: ${rowGap}px;
      column-gap: ${columnGap}px;
      width: 100%;
      max-width: ${containerWidth}px;
      height: ${containerHeight}px;
      margin: 0 auto;
    }
    
    .grid-item {
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="grid-container">
  ${htmlItems}
  </div>
</body>
</html>`;

    // Create and download file
    const blob = new Blob([htmlAndCss], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grid-layout.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  // Generate random layout
  const generateRandomLayout = () => {
    // Random template properties
    const rowOptions = [
      "repeat(3, 1fr)",
      "auto 1fr auto",
      "100px 1fr 100px",
      "repeat(2, 1fr) 2fr",
      "minmax(100px, auto) 1fr minmax(100px, auto)",
    ];

    const colOptions = [
      "repeat(3, 1fr)",
      "1fr 2fr 1fr",
      "repeat(4, 1fr)",
      "auto 1fr auto",
      "repeat(2, 2fr) 1fr",
    ];

    setRowTemplate(rowOptions[Math.floor(Math.random() * rowOptions.length)]);
    setColumnTemplate(
      colOptions[Math.floor(Math.random() * colOptions.length)]
    );
    setRowGap(Math.floor(Math.random() * 20) + 5);
    setColumnGap(Math.floor(Math.random() * 20) + 5);

    // Random colors
    const colors = [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#ec4899",
      "#14b8a6",
      "#f97316",
    ];

    // Generate 3-7 random grid items
    const itemCount = Math.floor(Math.random() * 5) + 3;
    const newItems = [];

    for (let i = 1; i <= itemCount; i++) {
      const rowStart = Math.floor(Math.random() * 2) + 1;
      const colStart = Math.floor(Math.random() * 2) + 1;
      const rowSpan = Math.floor(Math.random() * 2) + 1;
      const colSpan = Math.floor(Math.random() * 2) + 1;

      newItems.push({
        id: i,
        name: `Item ${i}`,
        color: colors[Math.floor(Math.random() * colors.length)],
        rowStart: rowStart,
        rowEnd: rowStart + rowSpan,
        colStart: colStart,
        colEnd: colStart + colSpan,
      });
    }

    setGridItems(newItems);
    setSelectedItem(1);
  };

  // Copy CSS to clipboard
  const copyToClipboard = () => {
    const css = `${generateContainerCSS()}\n\n${generateItemsCSS()}`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Add a new grid item
  const addGridItem = () => {
    if (gridItems.length < 12) {
      // Maximum 12 items
      // Generate a random color
      const colors = [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#ec4899",
        "#14b8a6",
        "#f97316",
      ];
      const newId = Math.max(...gridItems.map((item) => item.id), 0) + 1;

      // Find an empty or less occupied cell
      let defaultRowStart = 1;
      let defaultColStart = 1;

      // Try to place in a less crowded area
      const cellOccupancy = new Array(rows + 1)
        .fill(0)
        .map(() => new Array(columns + 1).fill(0));

      // Count existing items in each cell
      gridItems.forEach((item) => {
        for (let r = item.rowStart; r < item.rowEnd; r++) {
          for (let c = item.colStart; c < item.colEnd; c++) {
            if (r <= rows && c <= columns) {
              cellOccupancy[r][c]++;
            }
          }
        }
      });

      // Find cell with minimum occupancy
      let minOccupancy = Infinity;
      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= columns; c++) {
          if (cellOccupancy[r][c] < minOccupancy) {
            minOccupancy = cellOccupancy[r][c];
            defaultRowStart = r;
            defaultColStart = c;
          }
        }
      }

      setGridItems([
        ...gridItems,
        {
          id: newId,
          name: `Item ${newId}`,
          color: colors[Math.floor(Math.random() * colors.length)],
          rowStart: defaultRowStart,
          rowEnd: defaultRowStart + 1,
          colStart: defaultColStart,
          colEnd: defaultColStart + 1,
        },
      ]);

      setSelectedItem(newId);
    }
  };

  // Remove selected item
  const removeGridItem = () => {
    if (gridItems.length > 1) {
      const newItems = gridItems.filter((item) => item.id !== selectedItem);
      setGridItems(newItems);
      setSelectedItem(newItems[0].id);
    }
  };

  // Update item property
  const updateItemProperty = (property, value) => {
    const updatedItems = gridItems.map((item) => {
      if (item.id === selectedItem) {
        return { ...item, [property]: value };
      }
      return item;
    });
    setGridItems(updatedItems);
  };

  // Get the selected item
  const getSelectedItem = () => {
    return gridItems.find((item) => item.id === selectedItem);
  };
  // Generate grid lines display
  const renderGridLines = () => {
    // Calculate grid lines based on row and column templates
    const rowPositions = [];
    const colPositions = [];

    // Parse templates to create grid line positions
    const rowSizes = rowTemplate.split(/\s+/);
    const colSizes = columnTemplate.split(/\s+/);

    // This is a visual representation for the user
    // Each line represents the border between grid cells
    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical grid lines */}
        {Array.from({ length: columns + 1 }).map((_, i) => (
          <div
            key={`col-${i}`}
            className="absolute top-0 bottom-0 border-r border-blue-400"
            style={{
              left: `${(i / columns) * 100}%`,
              opacity: 0.4,
              borderStyle: i === 0 || i === columns ? "solid" : "dashed",
            }}
          />
        ))}

        {/* Horizontal grid lines */}
        {Array.from({ length: rows + 1 }).map((_, i) => (
          <div
            key={`row-${i}`}
            className="absolute left-0 right-0 border-b border-blue-400"
            style={{
              top: `${(i / rows) * 100}%`,
              opacity: 0.4,
              borderStyle: i === 0 || i === rows ? "solid" : "dashed",
            }}
          />
        ))}

        {/* Grid areas */}
        {showAreas &&
          gridItems.map((item) => (
            <div
              key={`area-${item.id}`}
              className="absolute border-2 border-white bg-black bg-opacity-10 flex items-center justify-center text-white text-sm font-bold"
              style={{
                top: `${((item.rowStart - 1) / rows) * 100}%`,
                left: `${((item.colStart - 1) / columns) * 100}%`,
                width: `${((item.colEnd - item.colStart) / columns) * 100}%`,
                height: `${((item.rowEnd - item.rowStart) / rows) * 100}%`,
                pointerEvents: "none",
              }}
            >
              {item.name}
            </div>
          ))}
      </div>
    );
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1
        className={`text-3xl font-bold mb-6 flex items-center ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        <GanttChart className="mr-2" size={28} />
        CSS Grid Generator
      </h1>

      {/* Main content */}
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
            Grid Container
          </h2>

          {/* Presets */}
          <div className="mb-6">
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Layout Presets
            </label>
            <div className="grid grid-cols-1 gap-2">
              {presets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => loadPreset(preset)}
                  className={`text-left px-3 py-2 border rounded-md transition-colors text-sm ${
                    isDarkMode
                      ? "bg-blue-900/20 hover:bg-blue-900/30 border-blue-900 text-white"
                      : "bg-blue-100 hover:bg-blue-200 border-blue-300 text-gray-900"
                  }`}
                >
                  {preset.name}
                </button>
              ))}
              <button
                onClick={generateRandomLayout}
                className={`flex items-center justify-center mt-2 px-3 py-2 border rounded-md transition-colors ${
                  isDarkMode
                    ? "bg-purple-900/20 hover:bg-purple-900/30 border-purple-800"
                    : "bg-purple-100 hover:bg-purple-200 border-purple-300 text-gray-900"
                }`}
              >
                <RefreshCw size={16} className="mr-2" />
                Random Layout
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Grid Template Rows
              </label>
              <input
                type="text"
                value={rowTemplate}
                onChange={(e) => setRowTemplate(e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  isDarkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
                placeholder="e.g. 1fr 2fr 1fr"
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Grid Template Columns
              </label>
              <input
                type="text"
                value={columnTemplate}
                onChange={(e) => setColumnTemplate(e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  isDarkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
                placeholder="e.g. 1fr 1fr 1fr"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Row Gap (px)
                </label>
                <input
                  type="number"
                  value={rowGap}
                  onChange={(e) => setRowGap(Number(e.target.value))}
                  className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                  min="0"
                  max="50"
                />
              </div>
              <div className="w-1/2">
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Column Gap (px)
                </label>
                <input
                  type="number"
                  value={columnGap}
                  onChange={(e) => setColumnGap(Number(e.target.value))}
                  className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                  min="0"
                  max="50"
                />
              </div>
            </div>

            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="show-grid-lines"
                checked={showGridLines}
                onChange={(e) => setShowGridLines(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="show-grid-lines"
                className={`ml-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Show Grid Lines
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-areas"
                checked={showAreas}
                onChange={(e) => setShowAreas(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="show-areas"
                className={`ml-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Show Grid Areas
              </label>
            </div>
          </div>

          {/* Selected item controls */}
          {getSelectedItem() && (
            <>
              <h2
                className={`text-xl font-semibold mb-4 border-t pt-4 mt-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Selected Item: {getSelectedItem().name}
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={getSelectedItem().name}
                    onChange={(e) => updateItemProperty("name", e.target.value)}
                    className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Color
                  </label>
                  <input
                    type="color"
                    value={getSelectedItem().color}
                    onChange={(e) =>
                      updateItemProperty("color", e.target.value)
                    }
                    className="h-10 w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Row Start
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={rows + 1}
                      value={getSelectedItem().rowStart}
                      onChange={(e) =>
                        updateItemProperty("rowStart", Number(e.target.value))
                      }
                      className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-300 bg-white text-gray-900"
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Row End
                    </label>
                    <input
                      type="number"
                      min={getSelectedItem().rowStart + 1}
                      max={rows + 2}
                      value={getSelectedItem().rowEnd}
                      onChange={(e) =>
                        updateItemProperty("rowEnd", Number(e.target.value))
                      }
                      className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-300 bg-white text-gray-900"
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Column Start
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={columns + 1}
                      value={getSelectedItem().colStart}
                      onChange={(e) =>
                        updateItemProperty("colStart", Number(e.target.value))
                      }
                      className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-300 bg-white text-gray-900"
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Column End
                    </label>
                    <input
                      type="number"
                      min={getSelectedItem().colStart + 1}
                      max={columns + 2}
                      value={getSelectedItem().colEnd}
                      onChange={(e) =>
                        updateItemProperty("colEnd", Number(e.target.value))
                      }
                      className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-300 bg-white text-gray-900"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Main content area: Preview and code output */}
        <div className="lg:col-span-2 flex flex-col order-1 lg:order-2">
          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={addGridItem}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              disabled={gridItems.length >= 12}
            >
              <Plus size={16} className="mr-2" />
              Add Item
            </button>
            <button
              onClick={removeGridItem}
              className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              disabled={gridItems.length <= 1}
            >
              <Trash size={16} className="mr-2" />
              Remove Item
            </button>
            <div className="ml-auto flex space-x-2">
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
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Preview
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowGridLines(!showGridLines)}
                  className={`flex items-center px-3 py-1 rounded-md transition-colors ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  title={showGridLines ? "Hide Grid Lines" : "Show Grid Lines"}
                >
                  {showGridLines ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={exportFullCode}
                  className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                  title="Export as HTML"
                >
                  <Download size={16} className="mr-1" />
                  Export
                </button>
              </div>
            </div>
            <div
              className={`relative overflow-auto border rounded-lg p-4 ${
                isDarkMode
                  ? "border-gray-600 bg-gray-900"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <div style={containerStyle} className="relative mx-auto">
                {showAreas && renderGridLines()}

                {gridItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      gridRowStart: item.rowStart,
                      gridRowEnd: item.rowEnd,
                      gridColumnStart: item.colStart,
                      gridColumnEnd: item.colEnd,
                      backgroundColor: item.color,
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                      border:
                        item.id === selectedItem ? "2px solid white" : "none",
                      boxShadow:
                        item.id === selectedItem ? "0 0 0 2px black" : "none",
                      zIndex: item.id === selectedItem ? 10 : 1,
                    }}
                    onClick={() => setSelectedItem(item.id)}
                  >
                    {item.name}
                  </div>
                ))}
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
              {generateContainerCSS()}
              {"\n\n"}
              {generateItemsCSS()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSGrid;
