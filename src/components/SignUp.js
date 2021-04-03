import React, { useState } from "react";
import { signUpRequest } from "../fetchRequests";
import { SIGNUP, useStore } from "../store/store";

function SignUp(props) {
  const dispatch = useStore((state) => state.dispatch);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpRequest(formData.email, formData.password).then((res) => {
      dispatch({ type: SIGNUP, payload: res });
    });
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData((state) => ({ ...state, [inputName]: inputValue }));
  };

  return (
    <>
      <form id="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          autoFocus
          required
          type="email"
          placeholder="example@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          placeholder="P@$$w0rd"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default SignUp;
