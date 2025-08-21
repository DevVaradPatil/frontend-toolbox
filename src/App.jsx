// src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";
import {
  BorderRadius,
  ButtonGallery,
  CSSGrid,
  Flexbox,
  GlassmorphismGenerator,
  GradientGenerator,
  GradientText,
  NeumorphismGenerator,
  ShadowGenerator,
  TailwindChart,
  Transform,
  Home,
} from "./pages";

const AppContent = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <Router>
      <div className={`flex min-h-screen ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
          }`}
        >
          <main className="p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/gradient-generator"
                element={<GradientGenerator />}
              />
              <Route path="/box-shadow" element={<ShadowGenerator />} />
              <Route path="/border-radius" element={<BorderRadius />} />
              <Route path="/button-gallery" element={<ButtonGallery />} />
              <Route path="/transform" element={<Transform />} />
              <Route path="/tailwind-colors" element={<TailwindChart />} />
              <Route path="/flexbox" element={<Flexbox />} />
              <Route path="/css-grid" element={<CSSGrid />} />
              <Route path="/gradient-text" element={<GradientText />} />
              <Route path="/neumorphism" element={<NeumorphismGenerator />} />
              <Route
                path="/glassmorphism"
                element={<GlassmorphismGenerator />}
              />
            </Routes>
          </main>
        </div>
        
        {/* Fixed Theme Toggle Button */}
        <ThemeToggle />
        
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: isDarkMode ? "#374151" : "#333",
              color: "#fff",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "white",
              },
            },
          }}
        />
      </div>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
