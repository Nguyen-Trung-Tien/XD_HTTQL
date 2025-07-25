/** @type {import('tailwindcss').Config} */
module.exports ={
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      colors: {
        primary: "#00BFFF",
        primaryLight: "#87CEFA",
        accent: "#FFD700",
        textPrimary: "#2D3748",
        textSecondary: "#718096",
        border: "#E2E8F0",
        card: "#FFFFFF",
        bg: { light: "#F0F8FF" }
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.05)",
        hover: "0 4px 12px rgba(0, 0, 0, 0.1)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-20px) translateX(10px)" },
          "50%": { transform: "translateY(-10px) translateX(-15px)" },
          "75%": { transform: "translateY(15px) translateX(5px)" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
