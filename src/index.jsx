import React from "react";
import ReactDOM from "react-dom/client"; // Используем "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <TonConnectUIProvider manifestUrl="https://dice-paradise.vercel.app/assets/tonconnect-manifest.json">
        <App />
      </TonConnectUIProvider>
    </BrowserRouter>
  );
}
