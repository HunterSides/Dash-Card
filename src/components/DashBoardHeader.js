import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Redirect, useHistory, withRouter } from "react-router-dom";
import logotwo from "../assets/images/DashVector.svg";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  logo: {
    width: "100%",
    maxWidth: 210,
    paddingTop: 5,
    paddingLeft: 15,
  },
  home: {
    color: "#008DE4",
    fontFamily: "Poppins",
  },

  about: {
    color: "#787878",
    fontFamily: "Poppins",
  },

  help: {
    backgroundColor: "#008DE4",
    color: "white",
    width: "100%",
    maxWidth: 210,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item container>
        <Grid item xs={12} sm={12} md={10} lg={10}>
          <img src={logotwo} alt="logo" className={classes.logo} />

          <Button className={classes.home}>Home</Button>

          <Button className={classes.about}>About</Button>
        </Grid>

        <Grid item>
          <Link href="/" onClick={Redirect}>
            <Button
              className={classes.help}
              variant="contained"
              href=""
              disableElevation
            >
              Log Out
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
