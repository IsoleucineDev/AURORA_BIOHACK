import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { DashboardView } from "./views/DashboardView";
import { HistoryView } from "./views/HistoryView";
import { AlertsView } from "./views/AlertsView";
import { SettingsView } from "./views/SettingsView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: DashboardView },
      { path: "historial", Component: HistoryView },
      { path: "alertas", Component: AlertsView },
      { path: "ajustes", Component: SettingsView },
    ],
  },
]);