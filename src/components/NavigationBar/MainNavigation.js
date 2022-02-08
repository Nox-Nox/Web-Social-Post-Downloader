import { AppBar, Toolbar } from "@mui/material";
import { Link } from "@mui/material";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";

const theme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#d9d9d9",
          "&:hover": {
            color: "white",
          },
          textDecoration: "none",
          padding: 20,
          fontSize: 25,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #F56040, #405DE6)",
        },
      },
    },
  },
});

function MainNavigation() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/twitterPage">Twitter Page</Link>
          <Link href="/instagramPage">Instagram Page</Link>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
export default MainNavigation;
