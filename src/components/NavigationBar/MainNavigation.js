import { AppBar, Toolbar, Link, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import MainNavigationTheme from "../Themes/MainNavigationTheme";

const themes = MainNavigationTheme;

const twitterTheme = "#1DA1F2";
const instagramTheme = "linear-gradient(90deg, #F56040, #405DE6)";

function MainNavigation() {
  const [isTheme, setTheme] = useState(twitterTheme);
  const handleClick = (theme) => {
    setTheme(
      (themes.components.MuiAppBar.styleOverrides.root.background = theme)
    );
  };

  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={themes}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/twitterPage" onClick={() => handleClick(twitterTheme)}>
            Twitter
          </Link>
          <Link
            href="/instagramPage"
            onClick={() => handleClick(instagramTheme)}
          >
            Instagram
          </Link>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
export default MainNavigation;
