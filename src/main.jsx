import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import App from "./App";
import FocusProvider from "./context/FocusProvider";

import "./index.css";
import "./styles/theme.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FocusProvider>
          <App />
        </FocusProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);