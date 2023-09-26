import React from "react";
import ReactDOM from "react-dom/client";
import { DreamContextProvider } from "./context/DreamsContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import App from "./App.tsx";
import "./css/index.css";
import "./css/theme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <DreamContextProvider>
          <App />
        </DreamContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
