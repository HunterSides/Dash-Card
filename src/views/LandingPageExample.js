import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
//views

//components

import Header from "../components/Header";
import SimpleSubmit from "../components/SearchBars/SimpleSubmit";

import GraphicFrame from "../assets/images/GraphicFrame.svg";
//mui
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Box,
  Paper
} from "@material-ui/core";
import { height } from "@material-ui/system";

require("dotenv").config();

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
export default function LandingPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item container>
          <Header />
        </Grid>
        <Grid item container xs={12} sm={12} md={8} spacing={3}>
          <Grid item>
            <img src={GraphicFrame} alt="logo" className={classes.logo} />
          </Grid>
          <Grid item>
            <div className={classes.content}>
              <h1>Manage your card</h1>
              <p>
                It's easy to manage your card online, enter your number below
                to:
              </p>
              <ul className={classes.subcontent}>
                <li>Check your card balance</li>
                <li>Top up your card with Dash</li>
                <li>Manage your pin</li>
                <li>Move your balance to a new card</li>
              </ul>
            </div>

            <SimpleSubmit />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
