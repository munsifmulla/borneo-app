import React, { useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import Header from "components/molecules/header";
import PieChart from "components/molecules/pieChart";
import BarChart from "components/molecules/barChart";
import ExpensList from "components/molecules/expenseList";
import AddExpens from "components/molecules/addExpense";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  cardMain: {
    padding: 10,
    backgroundColor: theme.pallete.theme.gray,
  },
  card: {
    padding: 10,
  },
}));

const HomePage = _ => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Grid className={classes.cardMain}>
        <Grid container spacing={3}>
          <Grid item xs={6} justifyContent="center">
            <Card className={classes.card}>
              <PieChart />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.card}>
              <BarChart />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.card}>
              <AddExpens />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.card}>
              <ExpensList />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
