import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouter } from "router/router";
import { theme } from "theme/global.jss";
import { DataProvider } from "services/DataProvider";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <DataProvider>
          <AppRouter />
        </DataProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
