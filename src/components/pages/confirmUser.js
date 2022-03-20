import React, { createRef } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  TextField,
  Button,
  Grid,
  Snackbar,
  Typography,
} from "@material-ui/core";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  loginContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.pallete.theme.lightBG,
  },
  loginCard: {
    width: "40rem",
  },
  loginBtn: {
    background: theme.pallete.theme.main,
    color: theme.pallete.white,
    "&:hover": {
      background: `${theme.pallete.theme.main}e0`,
    },
  },
}));

const ConfirmUserPage = _ => {
  const loginForm = createRef();
  const classes = useStyles();

  const confirmUser = ({ username, otp }) => {
    let poolData = {
      UserPoolId: "us-east-2_0zFL6Y5De", // Your user pool id here
      ClientId: "7f3fhnuqttfogg3ouorh96dl1r", // Your client id here
    };

    var userPool = new CognitoUserPool(poolData);
    var userData = {
      Username: username,
      Pool: userPool,
    };

    var cognitoUser = new CognitoUser(userData);
    return cognitoUser.confirmRegistration(otp, true, function (err, result) {
      if (err) {
        // alert(err.message || JSON.stringify(err));
        return err.message;
      }
      console.log("call result: " + result);
      return result;
    });
  };

  return (
    <div className={classes.loginContainer}>
      <Card className={classes.loginCard}>
        <CardContent>
          <Typography variant="h4">Confirm your Account</Typography>
          <form
            ref={loginForm}
            onSubmit={e => {
              e.preventDefault();
              console.log(
                // registerUser({
                //   email: "munsifmulla@gmail.com",
                //   username: "munsifmulla",
                //   password: "samplePass@123",
                // })
                confirmUser({
                  username: "munsifmulla",
                  otp: "033220",
                })
              );
            }}
          >
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <TextField
                  id="user-name"
                  label="Username"
                  name="user-name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="user-otp"
                  label="OTP"
                  name="user-otp"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  className={classes.loginBtn}
                >
                  Confirm
                </Button>
              </Grid>

              <Grid item>
                <span>
                  Already a User? <Link to="/login">Sinin from here!</Link>
                </span>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmUserPage;
