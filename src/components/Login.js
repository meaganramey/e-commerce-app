import React, { useState } from "react";
import { loginRequest } from "../fetchRequests";
import { LOGIN, useStore } from "../store/store";

function Login(props) {
  const dispatch = useStore((state) => state.dispatch);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
      e.preventDefault()
    loginRequest(formData.email, formData.password).then((res) =>
      dispatch({ type: LOGIN, payload: res })
    );
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData((state) => ({ ...state, [inputName]: inputValue }));
  };

  return (
    <>
      <form id="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          autoFocus
          type="text"
          value={formData.email}
          name="email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
