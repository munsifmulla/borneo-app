import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";

const ExpensList = _ => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(false);

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
  }, [deleted]);

  const deleteExpense = id => {
    fetch(
      "https://eikyz5cux7.execute-api.us-east-2.amazonaws.com/prod/expenses",
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          expenseId: id,
        }),
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setDeleted(true);
      });
  };

  if (loading) return <h5>Loading...</h5>;
  if (!data.length) return <h5>No records found...</h5>;
  return (
    <Grid xs={3}>
      <List dense>
        {data.map(item => (
          <ListItem key={item.date} button>
            <ListItemText
              id={item.date}
              primary={`${item.expenseType} - ${item.expense}`}
            />
            <ListItemSecondaryAction>
              <Button
                data-id={item.expenseId}
                onClick={e => deleteExpense(e.currentTarget.dataset.id)}
              >
                X
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default ExpensList;
