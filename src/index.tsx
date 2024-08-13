import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { theme } from "./theme/theme";
import { ColorModeScript } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import "@fontsource/inter";
import "@fontsource/inter/700.css"; // Specify weight

import "@fontsource/space-mono";
import { ARI10_GATEWAY_URL, ARI10_WIDGET_ID } from "./constants";
import "./App.css";
import "./i18n";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />

    <App />
  </React.StrictMode>,
);
