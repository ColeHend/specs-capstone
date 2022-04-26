import React from "react";
import { useFormik } from "formik";
import axios from "axios";
function MainWindow(props) {
  const { currGroup } = props;
  const initialValues = {
    locate_name: "",
    locate_desc: "",
    group_name: "",
    group_desc: "",
  };

  const onSubmit = () => {
    const toSubmit = { ...formik.values };
    axios.post("", toSubmit);
  };
  const validate = () => {};
  const formik = useFormik({ initialValues, onSubmit, validate });
  return (
    <form onSubmit={formik.handleSubmit} action="" method="post">
      <div>
        <span>Location</span>
      </div>
      <div>
        <span>Group: {currGroup}</span>
      </div>
      <div>
        <label htmlFor="locationName">Name: </label>
        <input
          name="locationName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.locate_name}
        />
      </div>
      <div>
        <label htmlFor="locationDesc">Description: </label>
        <textarea
          name="locationDesc"
          onChange={formik.handleChange}
          value={formik.values.locate_desc}
        />
      </div>
    </form>
  );
}

export default MainWindow;
