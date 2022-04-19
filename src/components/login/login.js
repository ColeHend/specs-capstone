import React from "react";
import { useFormik } from "formik";
function Login() {
  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = (values) => {
    console.log("Submitted!", values);
  };
  const validate = (values) => {
    console.log("validated", values);
  };
  const formik = useFormik({ initialValues, onSubmit, validate });
  return (
    <form action="/api/login" method="post" onSubmit={formik.handleSubmit}>
      <p>
        <label htmlFor="username">username</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Please enter your username.."
          type="text"
          name="username"
        />
      </p>
      <p>
        <label htmlFor="username">password</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Please enter password.."
          type="password"
          name="password"
        />
      </p>
      <button type="submit" disabled={!formik.isValid}>
        Submit
      </button>
    </form>
  );
}

export default Login;
