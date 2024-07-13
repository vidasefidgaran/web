import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      fontSize: {
        xs: "11px",
        sm: "12px",
        base: "14px",
        lg: "16px",
        xl: "22px",
        "2xl": "24px",
        "3xl": "28px",
        "4xl": "32px",
        "5xl": "36px",
        "6xl": "45px",
      },

      colors: {
        tint: "#169266",
        primary: {
          "50": "#ebfef4",
          "100": "#d0fbe4",
          "200": "#a4f6cd",
          "300": "#6aebb4",
          "400": "#2fd895",
          "500": "#0abf7d",
          "600": "#00b074",
          "700": "#007c55",
          "800": "#036244",
          "900": "#04503a",
          "950": "#012d22",
        },
        paper: "#F6F7F9",
        secondary: {
          "50": "#c3f1fc",
          "100": "#b1edfb",
          "200": "#8fe5f9",
          "300": "#6cddf8",
          "400": "#4ad5f6",
          "500": "#27cdf4",
          "600": "#21accd",
          "700": "#1b8ba6",
          "800": "#146b7f",
          "900": "#0e4a58",
        },
        "State/Error/Error": "#c30000",
        "State/Error/Error light": "#ed2e2e",
        "State/Error/Error extralight": "#fff2f2",
        "State/Success/Success": "#00966d",
        "State/Success/Success light": "#00ba88",
        "State/Success/Success extralight": "#f3fdfa",
        "State/Warning/Warning": "#a9791c",
        "State/Warning/Warning light": "#f4b740",
        "State/Warning/Warning extralight": "#fff8e1",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        xxl: "32px",
        "2xl": "64px",
      },
      padding: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
  },
 
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
