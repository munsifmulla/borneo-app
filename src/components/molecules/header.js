import React, { useContext } from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import UserContext from "context";

const useStyle = makeStyles(theme => ({
  header: {
    background: theme.pallete.theme.black,
    color: theme.pallete.theme.main,
    paddingLeft: theme.spacing(2),
    fontSize: theme.spacing(8),
    "& h5": {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  },
  cta: {
    color: theme.pallete.white,
  },
}));

const Header = _ => {
  const history = useHistory();
  const classes = useStyle();
  const { setLoggedIn } = useContext(UserContext);

  return (
    <Grid
      container
      className={classes.header}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <h5>Expense Manager</h5>
      </Grid>
      <Grid item>
        <Button
          className={classes.cta}
          onClick={() => {
            setLoggedIn({ isLoggedIn: false });
            history.push("/login");
          }}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
