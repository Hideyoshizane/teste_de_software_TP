import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import NoPage from "./pages/no-page/NoPage";
import { Box, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import Footer from "./shared-components/footer/Footer";

import RegisterStudent from "pages/register-student/RegisterStudent";
import ScheduledEvents from "pages/scheduled-events/ScheduledEvents";
import EventsNext from "pages/events-next/EventsNext";
import EventsOld from "pages/events-old/EventsOld";
import EventsRegister from "pages/events-register/EventsRegister";
import EventsDescription from "pages/events-description/EventsDescription";
import EventsAddPhotos from "pages/events-add-photos/EventsAddPhotos";
import ListStudent from "pages/student-list/ListStudent";
import { AppRoutes } from "routes";

let theme = createTheme({
  palette: {
    primary: {
      main: "#A5CEF4",
    },
    secondary: {
      main: "#E19626",
    },
    text: {
      primary: "#000",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Box marginBottom={'60px'}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>

          <Footer />
        </Box>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
