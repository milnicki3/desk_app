import { createTheme } from "@mui/material/styles";
import { colors } from "theme/colors.jss";

export const theme = createTheme({
  typography: {
    fontFamily: "Roboto,Arial,sans-serif",
    fontSize: 14,
    h1: {
      color: colors.white,
      textTransform: "uppercase",
      fontSize: 28,
      lineHeight: "42px",
      fontWeight: "normal",
    },
    body1: {
      color: colors.black,
      fontSize: 16,
      lineHeight: "26px",
      fontWeight: "normal",
    },
  },
  palette: {
    common: {
      black: colors.black,
      white: colors.white,
    },
    primary: {
      main: colors.violet,
    },
    secondary: {
      main: colors.pink,
    },
  },
});
