import React, { useState, createRef, useEffect } from "react";
import { TextField, Button, Grid, Snackbar } from "@material-ui/core";
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

const AddExpens = _ => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("success");
  const [disabled, setDisabled] = useState(false);
  const delayTimer = 6000;
  const addExpenseForm = createRef();
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://eikyz5cux7.execute-api.us-east-2.amazonaws.com/prod/expenses"
    )
      .then(res => res.json())
      .then(res => {
        const dataTransform = res.Items.map(item => {
          return Object.keys(item).reduce((acc, itemE) => {
            acc[itemE] = item[itemE].S || item[itemE].N;
            return acc;
          }, {});
        });
        console.log(dataTransform);
        setData(dataTransform);
        setLoading(false);
      });
  }, []);
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

  const addExpense = formDate => {
    fetch(
      "https://eikyz5cux7.execute-api.us-east-2.amazonaws.com/prod/expenses",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formDate),
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  };

  if (loading) return <h5>Loading...</h5>;
  if (!data.length) return <h5>No records found...</h5>;
  return (
    <Grid xs={3}>
      <Snackbar
        open={open}
        autoHideDuration={delayTimer}
        className={classes[variant]}
      >
        <h4>{message}</h4>
      </Snackbar>
      <form
        ref={addExpenseForm}
        onSubmit={e => {
          e.preventDefault();
          validateForm(addExpenseForm.current, addExpense);
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
              label="Expense Id"
              name="id"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Expense"
              label="Amount"
              name="amount"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="type"
              label="Type of expense"
              name="type"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="date"
              label="Date of expense"
              name="date"
              variant="standard"
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
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default AddExpens;
