import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import logotwo from "../assets/images/DashVector.svg";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  logo: {
    width: "100%",
    maxWidth: 210,
    paddingTop: 5,
    paddingLeft: 15
  },
  home: {
    color: "#008DE4",
    fontFamily: "Poppins",
    width: "100%",
    maxWidth: 210
  },

  about: {
    color: "#787878",
    fontFamily: "Poppins"
  },

  help: {
    backgroundColor: "#008DE4",
    color: "white",
    width: "100%",
    maxWidth: 210
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs={12} container>
        <Grid item xs={2}>
          <img src={logotwo} alt="logo" className={classes.logo} />
        </Grid>
        <Grid item xs={1}>
          <Button className={classes.home}>Home</Button>
        </Grid>
        <Grid item xs={1}>
          <Button className={classes.about}>About</Button>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={1}>
          <Button
            className={classes.help}
            variant="contained"
            href=""
            disableElevation
          >
            Get Help
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
