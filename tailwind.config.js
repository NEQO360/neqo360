module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#0055FF",
        bg: "#FAFAFA",
        gray: {
          600: "#888888",
        },
      },
      borderRadius: {
        l: "32px",
        m: "16px",
        s: "8px",
      },
      boxShadow: {
        glass: "0 8px 24px rgba(0,0,0,0.05)",
      },
      fontFamily: {
        headline: ["Inter", "Helvetica Neue", "sans-serif"],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
}; 