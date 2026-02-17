import "@testing-library/jest-dom";

// Mock Ziggy's global route() helper
global.route = (name, params = {}, absolute = false) => {
  let url = `/${name.replace(/\./g, "/")}`; // Simple: 'projects.index' → '/projects/index'

  // Optional: handle params if your tests need them
  if (Object.keys(params).length > 0) {
    const query = new URLSearchParams(params).toString();
    url += query ? `?${query}` : "";
  }

  if (absolute) {
    url = `http://localhost${url}`;
  }

  return url;
};
