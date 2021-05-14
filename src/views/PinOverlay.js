import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link, Redirect, useHistory, withRouter } from "react-router-dom";
//imports
import logotwo from "../assets/images/DashVector.svg";

//mui
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import axios from "axios";

require("dotenv").config();
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
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
function PinOverlay() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const defaultHeaders = { Authorization: "Bearer " + API_KEY };
  const [data, setData] = useState({
    cardNumber: "",
    pinNumber: ""
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
          body: JSON.stringify({ pin: data.pinNumber })
        }
      )
      .then(res => {
        if (res.status === 200) {
          console.log(res.status, res.data);

          let url = res.data.depositUrl;
          history.push({
            pathname: `/dashboard/:id/${url}`,
            cardInfo: res.data
          });
        }
      })

      .catch(error => {
        if (error.response.status === 401) {
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

  return (
    <div className={classes.overlay}>
      <img src={logotwo} alt="logo" className={classes.logo} />

      <Grid container justify="center" spacing={4}>
        <Paper>
          <div className={classes.submitForm}>
            <form onSubmit={e => handleSubmit(e)}>
              <input
                onChange={e => handleChange(e)}
                id="pinNumber"
                value={data.pinNumber}
                placeholder="Please input Pin"
                type="number"
              />
              <button>Verify</button>
            </form>
          </div>
        </Paper>
      </Grid>
    </div>
  );
}

export default PinOverlay;

/*Post to:
https://api.dashretail.org/store-cards/unknown?number=
[https://api.dashretail.org/store-cards/unknown?number=1993538082314783]
If response = data
Then render dashboard
if response = pin (401)
Prompt pin 
Then re-request number+pin
/store-cards/unknown?number=1993538082314783&pin=1234]
Then render data
*/
