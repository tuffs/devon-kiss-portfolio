import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { router } from "@inertiajs/react";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

const flashFadeLogic = () => {
  const el = document.getElementById("success_message");
  if (el) {
    // Clear any existing timeout events (e.g., from previous pages)
    clearTimeout(el.timeout);
    // Set 5-second timeout for auto-fade
    el.timout = setTimeout(() => {
      el.classList.add("opacity-0");
      setTimeout(() => {
        el.style.display = "none";
      }, 500);
    }, 5000);
  }
};

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx"),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: "#4B5563",
  },
});

// Listen for successful navigations (SPA page changes)
router.on("success", flashFadeLogic);
