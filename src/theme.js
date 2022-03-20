import { createMuiTheme } from "@material-ui/core/styles";

const borneo = createMuiTheme({
  spacing: 5,
  pallete: {
    theme: {
      main: "#00953b",
      gray: "#484b54",
      black: "#1e1d29",
      bg: "#232432",
      lightBG: "#2d2c32",
    },
    bgColor: "#f5f5f5",
    white: "#fff",
  },
});
borneo.name = "Borneo";

export default borneo;
