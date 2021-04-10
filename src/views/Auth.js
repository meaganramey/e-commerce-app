import React from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Login from "../components/Login";
import SignUp from "../components/SignUp";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function AuthView(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = history.location.pathname;

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {location === "/" && (
            <>
              <Login />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
          {location === "/signup" && (
            <>
              <SignUp />
              <Link component={RouterLink} to="/" variant="body2">
                {"Have an account? Sign In"}
              </Link>
            </>
          )}
        </div>
      </Container>
    </>
  );
}

export default AuthView;
