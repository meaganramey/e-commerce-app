import React from "react";
import { useHistory } from "react-router-dom";

import { useStore } from "../store/store";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("xs")]: {
      //   backgroundColor: theme.palette.secondary.main,
      minWidth: "200px",
      maxWidth: "90vw",
      margin: "0 auto",
      marginBottom: "10vh",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "450px",
      //   backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up("md")]: {
      //   backgroundColor: theme.palette.success.main,
      //   maxWidth: "750px",
    },
  },
  box: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  titleDiv: {
    [theme.breakpoints.up("xs")]: {
      width: "90%",
      textAlign: "center",
      fontSize: "xxx-large",
    },
  },
  details: {
    [theme.breakpoints.up("xs")]: {
      width: "90%",
      fontSize: "large",
    },
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
  },
  links: {
    [theme.breakpoints.up("xs")]: {
      width: "90%",
      display: "flex",
      flexDirection: "column",
      paddingLeft: "2rem",
      fontWeight: "bolder",
    },
  },
}));

const NotFound = (props) => {
  const user = useStore((state) => state.user);
  const history = useHistory();
  const classes = useStyles();

  const handleLink = (e) => {
    const place = e.target.name;
    if (place === "auth") {
      history.push("/");
    } else if (place === "products") {
      history.push("/products/");
    } else if (place === "cart") {
      history.push("/cart/");
    }
  };

  return (
    <>
      <Card className={classes.root}>
        <Box className={classes.box}>
          <CardContent className={classes.titleDiv}>
            <h2>Oops!</h2>
          </CardContent>
          <CardContent className={classes.details}>
            We can't seem to find the page you're looking for.
            <p>Error code: 404</p>
            Try these links instead:
            <div className={classes.links}>
              <Link color="secondary" name="products" onClick={handleLink}>
                Back to Products
              </Link>
              <Link color="secondary" name="cart" onClick={handleLink}>
                Check my cart
              </Link>
              {!user.token && (
                <Link
                  color="primary"
                  name="auth"
                  //   href='/'
                  onClick={handleLink}
                >
                  Sign In / Sign up
                </Link>
              )}
            </div>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default NotFound;
