import React, { createRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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

const RegisterPage = _ => {
  const loginForm = createRef();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("success");
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
  const delayTimer = 6000;

  const registerUser = ({ email, username, password }) => {
    let poolData = {
      UserPoolId: "us-east-2_0zFL6Y5De", // Your user pool id here
      ClientId: "7f3fhnuqttfogg3ouorh96dl1r", // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var attributeList = [];

    var dataEmail = {
      Name: "email",
      Value: email,
    };
    var attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    return userPool.signUp(
      username,
      password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          console.log(err.message);
          setOpen(true);
          setVariant("error");
          setMessage(err.message);
          setDisabled(false);
        }
        // var cognitoUser = result.user;
        setOpen(true);
        setVariant("success");
        setMessage(
          "Registeration Success, please confirm OTP and Authorize the account"
        );
        setTimeout(function () {
          history.push("/confirm-user");
        }, delayTimer);
        return result.user;
      }
    );
  };
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
          <Typography variant="h4">Register new User</Typography>
          <form
            ref={loginForm}
            onSubmit={e => {
              e.preventDefault();
              validateForm(loginForm.current, registerUser);
              // registerUser({
              //   email: "munsifmullda@gmail.com",
              //   username: "munsifmulladsa3d",
              //   password: "samplePass@123",
              // });
            }}
          >
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <TextField
                  id="user-email"
                  label="Email Id"
                  name="email"
                  variant="standard"
                  fullWidth
                />
              </Grid>
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
                  disabled={disabled}
                  className={classes.loginBtn}
                >
                  Signup
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

export default RegisterPage;
