import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// -----------------------------------------------------------
// import { App } from "./0_setup/App";  // with Stage, no light, no shadows enabled
// import { App } from "./1_setup/App"; // with lights without Stage
// -----------------------------------------------------------
// import { App } from "./2_listening_click_events/App";
// import { App } from "./3_other_events/App";
// import { App } from "./4_occluding/App";
// import { App } from "./5_cursor_change/App";
import { App } from "./6_cursor_change_helper/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
