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

function StoreCard() {
  useEffect(() => {}, []);

  const [data, setData] = useState({});

  const fetchCard = async () => {};

  return (
    <div>
      <h1>Card Info</h1>
    </div>
  );
}

export default StoreCard;
