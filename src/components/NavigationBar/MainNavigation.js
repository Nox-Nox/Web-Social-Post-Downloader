import { AppBar, Toolbar } from "@mui/material";
import { Link } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import InstagramTheme from "../Themes/InstagramTheme";
import TwitterTheme from "../Themes/TwitterTheme";

const theme = InstagramTheme;

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
