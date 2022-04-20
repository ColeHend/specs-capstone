import React from "react";
import { useFormik } from "formik";
import axios from "axios";
function Login(props) {
  const url = "http://localhost:4000";
  const { setIsLoggedIn } = props;
  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = (values) => {
    console.log("Submitted!", values);
    axios.post(url + "/api/login", values).then((res) => {
      setIsLoggedIn(true);
      window.localStorage.setItem("user_id", res.data.user_id);
      window.localStorage.setItem("username", res.data.username);
      console.log(res.data);
      props.close();
    });
  };
  const validate = (values) => {
    // console.log("validated", values);
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
