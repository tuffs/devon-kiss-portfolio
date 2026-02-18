import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { router } from "@inertiajs/react";

import $ from "jquery";

const appName =
  import.meta.env.VITE_APP_NAME || "Devon's Software Engineering Portfolio";

const flashFadeLogic = () => {
  const $el = $("#flash_message");
  if ($el.length) {
    // clear existing timeouts assigned to the DOM element
    const rawEl = $el[0];
    clearTimeout(rawEl.timeout);

    rawEl.timeout = setTimeout(() => {
      $el.fadeOut(3500);
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

setTimeout(flashFadeLogic, 100);
