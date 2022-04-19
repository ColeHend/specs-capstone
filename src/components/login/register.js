import React from "react";
import { useFormik } from "formik";

function Register() {
  const initialValues = {
    username: "",
    password: "",
    passwordConf: "",
  };
  const onSubmit = (values) => {
    console.log("Submitted!", values);
  };
  const validate = (values) => {
    console.log("validated", values);
  };
  const formik = useFormik({ initialValues, onSubmit, validate });
  return (
    <form onSubmit={formik.handleSubmit} method="post" action="/api/register">
      <p>
        <label htmlFor="username">Username</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Please enter username.."
          type="text"
          name="username"
        />
      </p>
      <p>
        <label htmlFor="password">password</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Please enter password.."
          type="password"
          name="password"
        />
      </p>
      <p>
        <label htmlFor="passwordConf">password</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.passwordConf}
          placeholder="Please enter password again.."
          type="password"
          name="passwordConf"
        />
      </p>
      <button type="submit">Submit</button>
    </form>
  );
}
export default Register;
