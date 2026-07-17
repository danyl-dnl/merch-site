import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Dismiss loading splash once React has mounted
const splash = document.getElementById("splash");
if (splash) {
  // Small delay so the first frame is painted before we hide the splash
  requestAnimationFrame(() => {
    setTimeout(() => splash.classList.add("hidden"), 200);
  });
}
