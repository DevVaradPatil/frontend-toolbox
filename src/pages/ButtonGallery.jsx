import React, { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import buttonsData from "../data/buttonsData.json";

const ButtonGallery = () => {
  const { isDarkMode } = useTheme();
  const [copiedId, setCopiedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Buttons" },
    { id: "standard", name: "Standard" },
    { id: "modern", name: "Modern" },
    { id: "fancy", name: "Fancy" },
    { id: "interactive", name: "Interactive" },
  ];
  const filteredButtons =
    selectedCategory === "all"
      ? buttonsData.buttons
      : buttonsData.buttons.filter(
          (button) => button.category === selectedCategory
        );

  const generateFullCSS = (button) => {
    let css = `.btn-${button.id} {\n  ${button.css.replace(/\n/g, "\n  ")}\n}`;

    if (button.cssHover) {
      css += `\n\n.btn-${button.id}:hover {\n  ${button.cssHover.replace(
        /\n/g,
        "\n  "
      )}\n}`;
    }

    if (button.cssActive) {
      css += `\n\n.btn-${button.id}:active {\n  ${button.cssActive.replace(
        /\n/g,
        "\n  "
      )}\n}`;
    }

    if (button.cssAfter) {
      css += `\n\n.btn-${button.id}::after {\n  ${button.cssAfter.replace(
        /\n/g,
        "\n  "
      )}\n}`;
    }

    if (button.cssHoverAfter) {
      css += `\n\n.btn-${
        button.id
      }:hover::after {\n  ${button.cssHoverAfter.replace(/\n/g, "\n  ")}\n}`;
    }

    if (button.cssLoading) {
      css += `\n\n.btn-${button.id}.loading {\n  ${button.cssLoading.replace(
        /\n/g,
        "\n  "
      )}\n}`;
    }

    if (button.cssAfterLoading) {
      css += `\n\n.btn-${
        button.id
      }.loading::after {\n  ${button.cssAfterLoading.replace(
        /\n/g,
        "\n  "
      )}\n}`;
    }

    if (button.keyframes) {
      css += `\n\n${button.keyframes}`;
    }

    return css;
  };

  const copyToClipboard = async (text, buttonId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(buttonId);
      toast.success("CSS copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  const ButtonPreview = ({ button }) => {
    const buttonStyle = {};

    // Parse CSS properties
    button.css.split("\n").forEach((line) => {
      const [property, value] = line.split(":").map((s) => s.trim());
      if (property && value) {
        const camelCaseProperty = property.replace(/-([a-z])/g, (g) =>
          g[1].toUpperCase()
        );
        buttonStyle[camelCaseProperty] = value.replace(";", "");
      }
    });

    return (
      <button
        className={`btn-preview btn-${button.id}`}
        style={buttonStyle}
        onClick={(e) => {
          if (button.id === "loading-spinner") {
            e.target.classList.toggle("loading");
          }
        }}
      >
        {button.txt || button.icon ? (
          <span className="btn-content">
            {button.txt || button.icon}
          </span>
        ) : (
            <span className="btn-content">Click me</span>
        )}
      </button>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1
        className={`text-3xl font-bold mb-6 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Button Gallery
      </h1>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-3 py-1 text-sm rounded-full capitalize ${
              selectedCategory === category.id
                ? `${
                    isDarkMode
                      ? "bg-blue-900 text-blue-200"
                      : "bg-blue-100 text-blue-800"
                  }`
                : `${
                    isDarkMode
                      ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredButtons.map((button) => (
          <div
            key={button.id}
            className={`rounded-lg shadow-md overflow-hidden border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Button Preview */}
            <div
              className={`p-4 flex items-center justify-center min-h-[120px] ${
                isDarkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <ButtonPreview button={button} />
            </div>

            {/* Button Info */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {button.name}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full capitalize ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {button.category}
                </span>
              </div>

              {/* CSS Code */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    CSS
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        generateFullCSS(button),
                        `${button.id}-css`
                      )
                    }
                    className={`${
                      isDarkMode
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="Copy CSS"
                  >
                    {copiedId === `${button.id}-css` ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                <div
                  className={`p-3 rounded-md text-xs font-mono max-h-20 overflow-y-auto ${
                    isDarkMode
                      ? "bg-gray-900 text-gray-300"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {generateFullCSS(button)}
                </div>
              </div>

              {/* HTML Code */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    HTML
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(button.html, `${button.id}-html`)
                    }
                    className={`${
                      isDarkMode
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="Copy HTML"
                  >
                    {copiedId === `${button.id}-html` ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                <div
                  className={`p-3 rounded-md text-xs font-mono ${
                    isDarkMode
                      ? "bg-gray-900 text-gray-300"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {button.html}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: buttonsData.buttons
            .map((button) => {
              return generateFullCSS(button);
            })
            .join("\n\n"),
        }}
      />
    </div>
  );
};

export default ButtonGallery;
