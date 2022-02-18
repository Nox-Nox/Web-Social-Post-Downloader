import { AppBar, Toolbar, Link, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import MainNavigationTheme from "../Themes/MainNavigationTheme";

const theme = MainNavigationTheme;
const instagramTheme = {
  background: "linear-gradient(90deg, #F56040, #405DE6)",
};
const twitterTheme = { background: "#1DA1F2" };

function MainNavigation() {
  const [isTheme, setTheme] = useState(twitterTheme.background);

  useEffect(() => {
    const currentTheme = sessionStorage.getItem("theme-color");
    if (currentTheme) {
      setTheme(currentTheme);
    }
  });

  const handleClick = (theme) => {
    setTheme(theme);
    sessionStorage.setItem("theme-color", theme);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={{ background: isTheme }}>
        <Toolbar>
          <Link
            href="/twitterPage"
            onClick={() => handleClick(twitterTheme.background)}
          >
            Twitter
          </Link>
          <Link
            href="/instagramPage"
            onClick={() => handleClick(instagramTheme.background)}
          >
            Instagram
          </Link>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
export default MainNavigation;
