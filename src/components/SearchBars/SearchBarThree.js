import React, { useState, useEffect } from "react";
//DOM
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory, withRouter } from "react-router-dom";
//MUI
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

import axios from "axios";

require("dotenv").config();

function SimpleSubmit() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const defaultHeaders = { Authorization: "Bearer " + API_KEY };

  const printResponseStatus = rsp => {
    console.log(`response: [${rsp.status}] ${rsp.statusText}`);
  };

  const [data, setData] = useState({
    cardNumber: "",
    accountData: ""
  });

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    let res;
    axios

      .post(`${BASE_URL}/store-cards/unknown?number=${data.cardNumber}`, {
        headers: { ...defaultHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ pin: "" })
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res.status, res.data);
          let url = res.data.id;
          //history.push(url) // reference https://dev.to/brad_beggs/handling-react-form-submit-with-redirect-async-await-for-the-beyond-beginner-57of
          history.push(`/dashboard/:id/${url}`);
        }
      })
      .catch(error => {
        console.log(error);
      });
    return res;
  }

  function handleChange(e) {
    //logs in console while typing
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  return (
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
  );
}

export default withRouter(SimpleSubmit);
