import { Link } from "react-router-dom";
import { AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import classes from "./MainNavigation.module.css";
import { createTheme } from "@mui/material";
import { green, cyan } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: cyan[700],
    },
    secondary: {
      main: green[500],
    },
    pale: {
      main: "#FCF4D9",
      contrastText: "#383838",
    },
  },
});

function MainNavigation() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4">Navbar</Typography>
          <div className={classes.test}>
            <Link to="/anyPage">Any Page</Link>
            <Link to="/twitterPage">Twitter Page</Link>
            <Link to="/instagramPage">Instagram Page</Link>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
export default MainNavigation;
