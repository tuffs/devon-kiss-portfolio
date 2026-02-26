import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
    },
    keyframes: {
      fadeInUp: {
        "0%": {
          opacity: "0",
          filter: "blur(35px)",
          transform: "translateY(125px)",
        },
        "100%": {
          opacity: "1",
          filter: "blur(0px)",
          transform: "translateY(0)",
        },
      },
    },
    animation: {
      "fade-in-up": "fadeInUp 1.5s ease-out forwards",
    },
  },

  plugins: [forms],
};
