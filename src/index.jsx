import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App"; // Your main app component

const root = ReactDOM.createRoot(document.getElementById("root")); // Ensure "root" matches your HTML file's div ID
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
