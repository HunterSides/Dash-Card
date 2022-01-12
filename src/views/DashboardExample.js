import React from "react";
import { useState, useEffect } from "react";
import QRcode from "qrcode.react";
import Redirect from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Container,
  Divider,
  AppBar,
  Typography,
  Grow,
  Grid,
  Box,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GraphicFrame from "../assets/images/GraphicFrame.svg";
import DashBoardHeader from "../components/DashBoardHeader";
import transitions from "@material-ui/core/styles/transitions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    color: "#1E266D",
    fontFamily: "Poppins",
    flexGrow: 1,
  },
  subcontent: {
    color: "#455880",
  },
  paper: {
    padding: theme.spacing(1),
    borderRadius: 30,
    borderColor: "#111921",
  },
  logo: {
    flexGrow: 1,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const qr = 123456789;

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item container>
          <DashBoardHeader />
        </Grid>

        <Grid item container xs={12} sm={12} md={10} lg={10} spacing={10}>
          <Grid item container direction="column" xs={12} sm={12} md={8} lg={6}>
            <Grid item>
              <Box border={1} padding={1}>
                <img src={GraphicFrame} alt="logo" className={classes.logo} />
              </Box>
            </Grid>
            <Grid item className={classes.content}>
              <Box border={1} padding={1}>
                <div>
                  {qr ? (
                    <QRcode
                      id="myqr"
                      value={qr}
                      size={320}
                      includeMargin={true}
                    />
                  ) : (
                    <p>No QR code preview</p>
                  )}
                  <h3>Wallet Address: 123456789</h3>
                </div>
              </Box>
            </Grid>
          </Grid>
          <Grid item container xs={12} sm={12} md={4} lg={4}>
            <Grid item className={classes.content}>
              <Box border={1} padding={2}>
                <div>
                  <h1>Account information</h1>

                  <h3>Current Balance: </h3>
                  <p>Dash: 1000</p>
                  <h3>Wallet Address:</h3>
                  <p>123456789</p>
                </div>
                <h3>Transactions: </h3>
                <div>
                  <ul key={1}>
                    <li>Withdraw</li>
                    <li>Date: 12/1/2021</li>

                    <li>ID: 123456</li>
                    <li>Amount: 20</li>
                  </ul>
                  <ul key={2}>
                    <li>Deposti</li>
                    <li>Date: 12/1/2021</li>

                    <li>ID: 123446</li>
                    <li>Amount: 10</li>
                  </ul>
                  <ul key={3}>
                    <li>Withdraw</li>
                    <li>Date: 12/1/2021</li>

                    <li>ID: 123436</li>
                    <li>Amount: 5</li>
                  </ul>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
