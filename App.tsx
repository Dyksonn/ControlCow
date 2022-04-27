import React from "react";
import { ThemeProvider } from 'styled-components';

import theme from "./src/styles/theme";

import { AppProvider } from "./src/hooks";

import CheckListContext from "./src/models/CheckList";

import Routes from "./src/routes";


const { RealmProvider } = CheckListContext;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}

function AppWrapper() {
  if (!RealmProvider) {
    return null;
  }
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
}

export default AppWrapper;
