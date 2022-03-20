import React, { createRef, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
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
import { makeStyles } from "@material-ui/styles";
import UserContext from "context";

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
  success: {
    background: theme.pallete.theme.main,
    color: theme.pallete.white,
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
  error: {
    background: "red",
    color: theme.pallete.white,
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
}));

const LoginPage = _ => {
  const loginForm = createRef();
  const classes = useStyles();
  const { setLoggedIn } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("success");
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const delayTimer = 6000;

  const validateForm = (form, cb) => {
    setDisabled(true);
    let errorLog = {};
    let formElems = {};
    for (let i = 0; i < form.elements.length; i++) {
      let _elem = form.elements[i];
      if (!["button"].includes(_elem.name)) {
        if (_elem.value === "" || _elem.value === null) {
          errorLog[_elem.name] = `${_elem.name} Is required Field`;
        } else {
          if (_elem.name === "email" && !_elem.value.match(regexEmail)) {
            errorLog[_elem.name] = `${_elem.name} Is not valid Email`;
          } else {
            formElems[_elem.name] = _elem.value;
          }
        }
      }
    }
    if (Object.keys(errorLog).length < 1) {
      cb(formElems);
    } else {
      setOpen(true);
      setVariant("error");
      setDisabled(false);
      setMessage(
        "Form has errors, please correct them, " +
          Object.values(errorLog).join(",")
      );
    }
  };

  const loginUser = _ => {
    setDisabled(true);
    var authenticationData = {
      Username: "munsifmulla",
      Password: "samplePass@123",
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    let poolData = {
      UserPoolId: "us-east-2_0zFL6Y5De", // Your user pool id here
      ClientId: "7f3fhnuqttfogg3ouorh96dl1r", // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var userData = {
      Username: "munsifmulla",
      Pool: userPool,
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();
        setLoggedIn({ isLoggedIn: true });
        localStorage.setItem("AUTH_TOKEN", accessToken);
        setDisabled(false);
        history.push("/");
      },

      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
        setDisabled(false);
      },
    });
  };

  return (
    <div className={classes.loginContainer}>
      <Snackbar
        open={open}
        autoHideDuration={delayTimer}
        className={classes[variant]}
      >
        <h4>{message}</h4>
      </Snackbar>
      <Card className={classes.loginCard}>
        <CardContent>
          <Typography variant="h4">Login</Typography>
          <form
            ref={loginForm}
            onSubmit={e => {
              e.preventDefault();
              validateForm(loginForm.current, loginUser);
            }}
          >
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <TextField
                  id="user-name"
                  label="Username"
                  name="name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="user-password"
                  label="Password"
                  name="password"
                  variant="standard"
                  type="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  name="button"
                  fullWidth
                  className={classes.loginBtn}
                  disabled={disabled}
                >
                  Login
                </Button>
              </Grid>
              <Grid item>
                <span>
                  Not a User? <Link to="/register">Register now!</Link>
                </span>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
