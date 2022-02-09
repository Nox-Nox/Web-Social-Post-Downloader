import { AppBar, Toolbar } from "@mui/material";
import { Link } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import MainNavigationTheme from "../Themes/MainNavigationTheme";

const theme = MainNavigationTheme;
const instagramTheme = "linear-gradient(90deg, #F56040, #405DE6)";
const twitterTheme = "#1DA1F2";

function MainNavigation() {
  const [isTrue, setTrue] = useState(false);
  const [isColor, setColor] = useState(twitterTheme);
  console.log(isColor);

  function changeTheme1() {
    if (isTrue === false) setColor(twitterTheme);
  }
  function changeTheme2() {
    if (isTrue === false) setColor(instagramTheme);
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={{ background: isColor }}>
        <Toolbar>
          <Link href="/twitterPage" onClick={changeTheme1}>
            Twitter Page
          </Link>
          <Link href="/instagramPage" onClick={changeTheme2}>
            Instagram Page
          </Link>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
export default MainNavigation;
