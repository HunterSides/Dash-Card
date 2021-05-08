import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import { useFormValidation, validators } from "../hooks/validation";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Main from "../assets/images/twofactor.jpg";
import Logo from "../assets/logo-blue.svg";
import breakpoints from "../breakpoints";
import LazyLoad from "react-lazy-load";
import LinkRouter from "../client/src/components/LinkRouter";
import Lock from "../assets/images/lock.gif";
import api from "../api";
import { toast } from "react-toastify";
import CodeInput from "../components/CodeInput";

//can be used for pin overlay
const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    [`@media screen and (min-width: ${breakpoints.responsive.mediumRes})`]: {
      minHeight: "100vh"
    }
  },
  imageLazyWrapper: {
    width: "100%",
    height: "100%",
    display: "block"
  },
  image: {
    backgroundImage: `url(${Main})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    display: "block",
    opacity: 0,
    transition: "opacity .5s ease-in-out",
    ["&.show"]: {
      transition: "opacity .5s ease-in-out",
      opacity: 1
    }
  },
  paper: {
    padding: theme.spacing(3.5, 3, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    boxSizing: "border-box",
    justifyContent: "space-around",
    [`@media screen and (min-width: ${breakpoints.responsive.mediumRes})`]: {
      padding: theme.spacing(12, 8),
      justifyContent: "flex-start"
    }
  },
  formWrapper: {
    display: "flex",
    maxWidth: 500,
    width: "100%",
    flexDirection: "column",
    alignItems: "center"
  },
  logoWrapper: {
    maxWidth: 180,
    width: "100%",
    margin: theme.spacing(0, 0, 2),
    [`@media screen and (min-width: ${breakpoints.responsive.mediumRes})`]: {
      margin: theme.spacing(2, 0, 2),
      maxWidth: 200
    }
  },
  logo: {
    maxWidth: 180,
    width: "100%",
    height: "auto",
    [`@media screen and (min-width: ${breakpoints.responsive.mediumRes})`]: {
      maxWidth: 200
    }
  },
  intro: {
    fontSize: "1rem",
    margin: theme.spacing(0, 0, 1),
    [`@media screen and (min-width: ${breakpoints.responsive.mediumRes})`]: {
      fontSize: "1.2rem",
      margin: theme.spacing(1, 0, 1)
    }
  },
  subline: {
    margin: theme.spacing(0, 0, 1),
    color: "#555553",
    fontSize: "0.8rem",
    [`@media screen and (min-width: ${breakpoints.responsive.mediumRes})`]: {
      margin: theme.spacing(0, 0, 2),
      fontSize: "1rem"
    }
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  textField: {
    marginTop: theme.spacing(2),
    width: "100%",
    display: "block"
  },
  button: {
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(1.5, 0, 1.5)
  },
  backLink: {
    width: "auto",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "1rem",
    lineHeight: 1,
    marginTop: theme.spacing(6)
  },
  lock: {
    width: "100%",
    height: "auto",
    maxWidth: 140
  }
}));

let temporaryCredentials;
export function setTemporaryLoginCredentials(c) {
  temporaryCredentials = c;
}

function TwoFactorView(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const imageRef = useRef(null);

  const twoFAForm = useFormValidation({
    state: {
      twofa: ""
    },
    fields: {
      twofa: {
        validators: [[validators.required, t("2FA Code Required")]]
      }
    }
  });

  useEffect(() => {
    if (!temporaryCredentials) {
      props.history.push("/login");
    }

    fetch(Main).then(() => {
      if (imageRef.current) {
        imageRef.current.classList.add("show");
      }
    });

    return () => {
      temporaryCredentials = undefined;
    };
  }, []);

  useEffect(() => {
    let s = onSubmit;
    if (twoFAForm.canSubmit()) {
      s();
    }
    return () => (s = () => {});
  }, [twoFAForm.state]);

  function onSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    if (!twoFAForm.canSubmit()) {
      return;
    }

    api
      .login({ ...temporaryCredentials, token: twoFAForm.state.twofa })
      .then(rsp => {
        if (rsp.ok) {
          props.history.push("/");
        } else {
          toast.error(t("Failed to login"));
        }
      });
  }

  function onClickBackToLogin(event) {
    event.preventDefault();
    props.history.push("/login");
  }

  function onCodeComplete(code) {
    twoFAForm.setState({ ...twoFAForm.state, twofa: code });
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={5} lg={7}>
        <LazyLoad className={classes.imageLazyWrapper} debounce={false}>
          <div className={classes.image} ref={imageRef} />
        </LazyLoad>
      </Grid>
      <Grid item xs={12} md={7} lg={5} component={Paper} elevation={0} square>
        <div className={classes.paper}>
          <div className={classes.formWrapper}>
            <LinkRouter className={classes.logoWrapper} to="/">
              <img src={Logo} className={classes.logo} />
            </LinkRouter>
            <img src={Lock} className={classes.lock} />
            <Typography
              component="h2"
              variant="h6"
              align="center"
              className={classes.subline}
            >
              {t("Please enter your 2FA Code:")}
            </Typography>
            <form className={classes.form} onSubmit={onSubmit}>
              <CodeInput
                onComplete={onCodeComplete}
                disabled={twoFAForm.field("twofa").disabled}
              />
              <a
                href="#"
                onClick={onClickBackToLogin}
                className={classes.backLink}
              >
                &larr; {t("Back to login.")}
              </a>
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default TwoFactorView;
