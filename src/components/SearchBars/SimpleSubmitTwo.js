import React, { useState, useEffect } from "react";
//DOM
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory, withRouter, Link } from "react-router-dom";
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

  let history = useHistory();
  const [data, setData] = useState({
    cardNumber: ""
  });
  useEffect(() => {
    fetchInfo;
  });
  function handleSubmit(e) {
    e.preventDefault();

    const fetchInfo = async () => {
      const info = await fetch(
        `${BASE_URL}/store-cards/unknown?number=${data.cardNumber}`,
        {
          method: "POST",
          headers: { ...defaultHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ pin: "" })
        }
      );

      const storeCard = await info.json();
      console.log(storeCard);
    };
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
