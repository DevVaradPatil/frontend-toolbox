// src/data/toolsData.js
import {
  Palette,
  Box,
  Circle,
  Grid,
  Move,
  LayoutGrid,
  GanttChart,
  Type,
  Sparkles,
  ToggleLeft,
  Layers,
} from "lucide-react";

const toolsData = [
  {
    title: "Gradient Generator",
    description:
      "Create and customize beautiful CSS gradients with live preview",
    icon: Palette,
    path: "/gradient-generator",
  },
  {
    title: "Box Shadow Tool",
    description: "Design and tweak box shadows with real-time preview",
    icon: Box,
    path: "/box-shadow",
  },
  {
    title: "Border Radius Tool",
    description:
      "Create custom shapes with precise control of each corner radius",
    icon: Circle,
    path: "/border-radius",
  },
  // {
  //   title: "Button Gallery",
  //   description:
  //     "Collection of beautiful buttons from standard to fancy with copy functionality",
  //   icon: ToggleLeft,
  //   path: "/button-gallery",
  // },
  {
    title: "Tailwind Color Chart",
    description: "Explore and pick from Tailwind CSS color palette",
    icon: Grid,
    path: "/tailwind-colors",
  },
  {
    title: "CSS Transform",
    description:
      "Experiment with rotate, scale, skew, and translate transformations",
    icon: Move,
    path: "/transform",
  },
  {
    title: "Flexbox Playground",
    description: "Experiment with flexbox layouts and properties in real-time",
    icon: LayoutGrid,
    path: "/flexbox",
  },
  {
    title: "CSS Grid Generator",
    description:
      "Visually create grid layouts and get the corresponding CSS code",
    icon: GanttChart,
    path: "/css-grid",
  },
  {
    title: "Gradient Text Generator",
    description: "Apply beautiful gradient effects to text with live preview",
    icon: Type,
    path: "/gradient-text",
  },
  {
    title: "Neumorphism Generator",
    description: "Create soft UI elements with depth and shadow effects",
    icon: Layers,
    path: "/neumorphism",
  },
  {
    title: "Glassmorphism Generator",
    description: "Create modern UI elements with the frosted glass effect",
    icon: Sparkles,
    path: "/glassmorphism",
  },
];

export default toolsData;
