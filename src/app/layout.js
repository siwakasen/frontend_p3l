"use client";
import  { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { ThemeSettings } from "@/utils/theme/Theme";
import "@/styles/globals.css";
import { store, persistor } from "@/utils/store";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout({ children }) {
  const theme = ThemeSettings();
  return (
    <ThemeProvider theme={theme}>
      <html lang="id">
        <body suppressHydrationWarning={true}>
        <CssBaseline />
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            {children}
          </Provider>
        </PersistGate>
        </body>
      </html>
    </ThemeProvider>
  );
}
