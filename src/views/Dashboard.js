import React from "react";
import { useState, useEffect } from "react";
import QRcode from "qrcode.react";

import { useLocation } from "react-router-dom";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GraphicFrame from "../assets/images/GraphicFrame.svg";
import DashBoardHeader from "../components/DashBoardHeader";

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
  const location = useLocation();
  const data = location.cardInfo;
  const qr = data.address;
  //const [data, setData] = useState();
  //sessionStorage.setItem("sessionData", data);
  const [sessionData, setSessionData] = useState();
  useEffect(() => {
    sessionStorage.setItem("sessionData", data);
  }, [data]);

  useEffect(() => {
    const parsedData = sessionStorage.getItem("sessionData");
    setSessionData(parsedData);
  }, []);

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
                  <h3>Wallet Address:</h3>
                  <p>{data.address}</p>
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
                  <p>Dash: {data.balance}</p>
                  <h3>Wallet Address:</h3>
                  <p>{data.address}</p>
                </div>
                <h3>Transactions: </h3>
                <div>
                  {data.transactions.map((transaction, index) => {
                    return (
                      <ul key={index}>
                        <li>{transaction.Type}</li>
                        <li>Date: {transaction.Created}</li>

                        <li>ID: {transaction.Id}</li>
                        <li>Amount: {transaction.Subunits}</li>
                      </ul>
                    );
                  })}
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

/**to render transaction 
 * <div>
              {transactions.map((transaction, index) => {
                return <div key={index}> {transaction.Id} </div>;
              })}
            </div>
 * 
 * 
 */
