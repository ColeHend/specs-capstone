import React, { useContext } from "react";
import { UserContext } from "../../../App";
import { useFormik } from "formik";
import axios from "axios";
function AddLocation(props) {
  const { userInfo } = useContext(UserContext);
  const { currGroup } = props;
  const initialValues = {
    locate_name: "",
    locate_desc: "",
    group_name: "",
    group_desc: "",
  };

  const onSubmit = (values, { resetForm }) => {
    const toSubmit = { ...values, ...userInfo };
    axios.post("http://localhost:4000/api/locations", toSubmit).then((res) => {
      resetForm({});
    });
  };
  const validate = () => {};
  const formik = useFormik({ initialValues, onSubmit, validate });
  return (
    <form onSubmit={formik.handleSubmit} action="/api/locations" method="post">
      <div>
        <span>Location</span>
      </div>
      <div>
        <span>Group: {currGroup}</span>
      </div>
      <div>
        <label htmlFor="locationName">Name: </label>
        <input
          name="locate_name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.locate_name}
        />
      </div>
      <div>
        <label htmlFor="locationDesc">Description: </label>
        <textarea
          name="locate_desc"
          onChange={formik.handleChange}
          value={formik.values.locate_desc}
        />
      </div>
      <div>
        <button type="submit">Add Location</button>
      </div>
    </form>
  );
}

export default AddLocation;
