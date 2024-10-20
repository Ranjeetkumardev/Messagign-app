/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode : "class",
    extend: {
      // colors: {
      //   white : "#ffffff",
      //   gray : {
      //     100 : "#f3f4f6",
      //     200 : "#e5e7eb",
      //     300 : "#d1d5db",
      //     500 : "#6b7280",
      //     700 : "#374151",
      //     800 : "#1f2937",
      //   },
      //   blue : {
      //     200 : "#93c5fd",
      //     400 : "#60a5fa",
      //     500 : "#3b82",
           
      //   },
      //   "dark-bg" : "#101214",
      //   "dark-secondary" : "#1d1f21",
      //   "dark-tertiary" : "#3b3d40",
      //   "blue-primary" : "#0275ff",
      //   "stroke-dark" : "#2d3135",
      // },
      colors: {
        // Light Mode Colors
        primary: '#007BFF', // Blue
        secondary: '#20C997', // Teal
        error: '#FF3D00', // Red
        warning: '#FFC107', // Orange
        success: '#28A745', // Green
        lightBg: '#F8F9FA', // Light background
        darkBg: '#243642', // Dark background
        gray: '#6C757D', // Gray
        darkGrayText: '#343A40', // Darker gray for text
        lightGrayText: '#CED4DA', // Lighter gray for text
        
        // Dark Mode Colors
        darkGrayInput: '#1E1E1E', // Dark gray for inputs
        darkAccent: '#FFDD57', // Softer yellow for dark mode

        // Interactive Colors
        buttonHover: '#0056b3', // Blue hover
        secondaryButtonHover: '#1B8A66', // Teal hover
        
        // Chat Bubble Colors
        outgoingBubbleBg: '#E6F7FF', // Outgoing bubble
        incomingBubbleBg: '#F1F1F1', // Incoming bubble
      },
    },
    
  },
  plugins: [],
}

