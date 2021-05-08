import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link, Redirect, useHistory, withRouter } from "react-router-dom";

import Header from "../components/Header";

import GraphicFrame from "../assets/images/GraphicFrame.svg";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import axios from "axios";
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

function TestLandingPage() {
  const classes = useStyles();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const defaultHeaders = { Authorization: "Bearer " + API_KEY };
  const [data, setData] = useState({
    cardNumber: ""
  });
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/store-cards/unknown?number=${data.cardNumber}`, {
        headers: { ...defaultHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ pin: "" })
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res.status, res.data);

          let url = res.data.depositUrl;
          history.push({
            pathname: `/dashboard/:id/${url}`,
            cardInfo: res.data
          });
          //history.push(`/dashboard/:id/${cardId}`); //used to redirect
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleChange(e) {
    //logs in console while typing
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  return (
    <Router>
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

              <div>
                <form onSubmit={e => handleSubmit(e)}>
                  <input
                    onChange={e => handleChange(e)}
                    id="cardNumber"
                    value={data.cardNumber}
                    placeholder="card number here"
                    type="number"
                  />

                  <button>Submit</button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}
export default withRouter(TestLandingPage);
