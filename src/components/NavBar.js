import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Green from "@material-ui/core/colors/green";
import Red from "@material-ui/core/colors/red";

import { logoutRequest } from "../fetchRequests";
import { LOGOUT, useStore } from "../store/store";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  good: {
    backgroundColor: Green[300],
  },
  bad: {
    backgroundColor: Red[300],
  },
}));

function NavBar(props) {
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const dispatch = useStore((state) => state.dispatch);
  const [toggleAuth, setToggleAuth] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  const handleLogout = (e) => {
    // if (window.confirm("Are you sure you want to logout?")) {
    logoutRequest(user.token).then(() => {
      console.log("after the logout request");
      dispatch({ type: LOGOUT });
      handleCloseModal();
    });
    // }
  };

  const handleToggleAuth = (e) => {
    setToggleAuth(!toggleAuth);
    handleClose();
  };

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Are you sure you sure you want to logout?</h2>
      <Button
        id="simple-modal-confirm-logout"
        className={classes.bad}
        component={RouterLink}
        to="/"
        onClick={handleLogout}
      >
        Logout
      </Button>

      <Button
        id="simple-modal-confirm-logout"
        className={classes.good}
        onClick={handleCloseModal}
      >
        Go Back
      </Button>
    </div>
  );

  return (
    <>
      <AppBar position="static" style={{ marginBottom: 30 }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <div>
              <MenuIcon
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={RouterLink} to="/">
                  Home
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/products"
                >
                  Products
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/add-product"
                >
                  Add Product
                </MenuItem>

                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/cart"
                >
                  Cart <span>{cart.length ? `${cart.length} items` : ""}</span>
                </MenuItem>
                {!user.token ? (
                  toggleAuth ? (
                    <MenuItem
                      onClick={handleToggleAuth}
                      component={RouterLink}
                      to="/signup"
                    >
                      Sign Up
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={handleToggleAuth}
                      component={RouterLink}
                      to="/"
                    >
                      Login
                    </MenuItem>
                  )
                ) : (
                  <MenuItem component={RouterLink} to="/" onClick={handleOpen}>
                    Logout
                  </MenuItem>
                )}
              </Menu>
            </div>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            E-Commerce
          </Typography>
          {!user.token ? (
            toggleAuth ? (
              <Button
                onClick={handleToggleAuth}
                color="inherit"
                component={RouterLink}
                to="/signup"
              >
                Sign Up
              </Button>
            ) : (
              <Button
                onClick={handleToggleAuth}
                color="inherit"
                component={RouterLink}
                to="/"
              >
                Login
              </Button>
            )
          ) : (
            <Button color="inherit" onClick={handleOpen}>
              Logout
            </Button>
          )}
          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
