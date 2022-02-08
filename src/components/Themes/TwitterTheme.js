import { createTheme } from "@mui/material";

const TwitterTheme = createTheme({
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
          background: "#1DA1F2",
        },
      },
    },
  },
});

export default TwitterTheme;
