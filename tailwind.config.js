/** @type {import('tailwindcss').Config} */
import scrollbarPlugin from "tailwind-scrollbar";
// import '@fontsource/tajawal';
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: "auto 1fr ",
      },
      colors: {
        mainBlue: "#2579A7",
        mainGray: "#f3f4f6",
        inputBorder: "#BDBDBD",
        inputHover: "#F1F1F1",
        inputFocuse: "#2424240D",
        borderColor: "#D0D5DD",
        borderNotActiveHoverColor: "#98A2B324",
        borderActiveHoverColor: "#9E77ED3D",
        inputTextColor: "#525252",
      },
      backgroundImage: {
        logoCompany: "url('/public/images/logos/logo1.webp')",
        logoMinistry: "url('/public/images/logos/logo2.png')",
      },
      fontFamily: {
        tajawal: ["Tajawal", "sans-serif"],
      },
    },
  },
  plugins: [scrollbarPlugin],
};
