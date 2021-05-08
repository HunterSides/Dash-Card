import React from "react";
import { useState, useEffect } from "react";

import Redirect from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Box,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GraphicFrame from "../assets/images/GraphicFrame.svg";
import DashBoardHeader from "../components/DashBoardHeader";
import transitions from "@material-ui/core/styles/transitions";
//this.props.location.cardInfo

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    color: "#1E266D",
    fontFamily: "Poppins",
    flexGrow: 1
  },
  subcontent: {
    color: "#455880"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  logo: {
    flexGrow: 1
  }
}));

export default function Dashboard() {
  const location = useLocation();
  const data = location.cardInfo;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item container>
          <DashBoardHeader />
        </Grid>
        <Grid item container xs={12} sm={12} md={8} spacing={3}>
          <Grid item>
            <img src={GraphicFrame} alt="logo" className={classes.logo} />
          </Grid>
          <Grid item>
            <div>
              <h1>Account information</h1>

              <h3>Current Balance: </h3>
              <p>Dash: {data.balance}</p>
              <h3>Wallet Address:</h3>
              <p>{data.address}</p>
              <h3>Transactions: </h3>
              <ul></ul>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
