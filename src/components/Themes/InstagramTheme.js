import { createTheme } from "@mui/material";

const InstagramTheme = createTheme({
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

export default InstagramTheme;
