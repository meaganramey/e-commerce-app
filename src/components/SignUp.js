import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { loginRequest, signUpRequest } from "../fetchRequests";
import { LOGIN, SIGNUP, useStore } from "../store/store";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useStore((state) => state.dispatch);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpRequest(formData.email, formData.password).then((res) => {
      dispatch({ type: SIGNUP, payload: res });
      if (res.statusCode === 200) {
        loginRequest(formData.email, formData.password)
          .then((res) => {
            dispatch({ type: LOGIN, payload: res });
            if (formData.rememberMe) {
              localStorage.setItem("token", res.token);
              localStorage.setItem("email", res.email);
            }
            localStorage.setItem("rememberMe", formData.rememberMe);
          })
          .then(() => history.push("/"));
      }
    });
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((state) => ({ ...state, [inputName]: inputValue }));
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} id="signup-form" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          placeholder="example@example.com"
          autoFocus
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="P@$$w0rd"
          value={formData.password}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              value="rememberMe"
              name="rememberMe"
              color="primary"
              onChange={handleChange}
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
}

export default SignUp;
