import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect, useHistory, withRouter } from "react-router-dom";
//imports
import Header from "../components/Header";
import logotwo from "../assets/images/DashVector.svg";
import GraphicFrame from "../assets/images/GraphicFrame.svg";
//mui
import Link from "@material-ui/core/Link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { CssBaseline, Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

import axios from "axios";

require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
    width: "90%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  iconButton: {
    padding: 10,
  },
  logo: {
    width: 190,
    height: 25,
  },
  verifyButton: {
    margin: theme.spacing(1),
    width: "90%",
    backgroundColor: "#a6a6a6",
    color: "#FFFFFF",
    height: 38,
    borderRadius: 2,
    fontSize: 11,
  },

  dashMidGrey: {
    color: "#7F8C98",
  },
  dashDarkGray: {
    color: "#787878",
  },
  dashBlack: {
    color: "#111921",
  },
  dashBlue: {
    color: "#008DE4",
  },
  disabled: {
    color: "A6A6A6",
  },
  dashWhite: {
    color: "white",
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#7F8C98",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#7F8C98",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#7F8C98",
      },
      "&:hover fieldset": {
        borderColor: "#008DE4",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#008DE4",
      },
    },
  },
})(TextField);

function LandingPage() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const defaultHeaders = { Authorization: "Bearer " + API_KEY };
  const [data, setData] = useState({
    cardNumber: "",
    pinNumber: "",
  });
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        `${BASE_URL}/store-cards/unknown?number=${data.cardNumber}&pin${data.pinNumber}`,
        {
          headers: { ...defaultHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ pin: data.pinNumber }),
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.status, res.data);

          let url = res.data.depositUrl;
          history.push({
            pathname: `/dashboard/:id/${url}`,
            cardInfo: res.data,
          });
        }
      })

      .catch((error) => {
        if (error.res.status === 401) {
          setOpen(!open);
          console.log(`Response Error: Pin required `);
        } else if (error.response.status === 404) {
          setOpen(!open);
          console.log(`Response Error: ${error.response.status}`);
        } else {
          console.log(`Response Error: ${error.response.status}`);
        }
      });
  }

  function handleChange(e) {
    //logs in console while typing
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <CssBaseline>
      <div className={classes.root}>
        <Grid container justify="center" spacing={4}>
          <Grid item container>
            <Header />
          </Grid>

          <Grid item container xs={12} sm={12} md={8} spacing={3}>
            <Grid item>
              <img src={GraphicFrame} alt="mainlogo" />
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
              <div className="submitForm">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <CssTextField
                    className={classes.margin}
                    onChange={(e) => handleChange(e)}
                    id="cardNumber"
                    value={data.cardNumber}
                    label="Enter card number"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          type="submit"
                          className={classes.iconButton}
                          aria-label="search"
                        >
                          <SearchIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </form>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <div className="overlay">
          <Button variant="outlined" color="primary" onClick={handleToggle}>
            Show backdrop
          </Button>

          <Backdrop className={classes.backdrop} open={open}>
            <Grid item container justify="center" xs={6} sm={6} md={8} lg={8}>
              <Paper className={classes.paper} elevation={0} square>
                <Grid item>
                  <img src={logotwo} alt="logo" className={classes.logo} />
                </Grid>

                <Grid item className={classes.dashBlack}>
                  <h3>PIN Code</h3>
                </Grid>
                <Grid item>
                  <h4>Please Enter your PIN to continue</h4>
                </Grid>
                <Grid item>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <CssTextField
                      className={classes.margin}
                      onChange={(e) => handleChange(e)}
                      inputProps={{ maxLength: 6 }}
                      id="pinNumber"
                      value={data.pinNumber}
                      label="PIN"
                      variant="outlined"
                      size="small"
                    />

                    <Button
                      className={classes.verifyButton}
                      variant="contained"
                      disableElevation
                      type="submit"
                    >
                      <LockOutlinedIcon /> Verify
                    </Button>
                  </form>
                </Grid>
                <Grid item className={classes.boldText}>
                  <h5>
                    Issues with your code?{" "}
                    <Link
                      href="help.dashcard.org"
                      onClick={Redirect}
                      className={classes.dashBlue}
                    >
                      Get help
                    </Link>
                  </h5>
                </Grid>
              </Paper>
            </Grid>
          </Backdrop>
        </div>
      </div>
    </CssBaseline>
  );
}
export default withRouter(LandingPage);
/**<form onSubmit={e => handleSubmit(e)}>
                  <TextField
                    onChange={e => handleChange(e)}
                    id="cardNumber"
                    value={data.cardNumber}
                    placeholder="card number here"
                    type="number"
                    label="Enter card number"
                    variant="outlined"
                  />
                  <button>Submit</button>
                </form> */
