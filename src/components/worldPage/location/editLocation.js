import React, { useContext } from "react";
import { UserContext } from "../../../App";
import { useFormik } from "formik";
import axios from "axios";
function EditLocation(props) {
  const {
    location_id,
    title: locate_name,
    location_desc: locate_desc,
  } = props.editHold;
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { currGroup } = props;
  console.log("edithold: ", props.editHold);
  const initialValues = {
    locate_name: locate_name,
    locate_desc: locate_desc,
  };

  const onSubmit = (values, { resetForm }) => {
    const toSubmit = { ...values, ...userInfo, location_id };
    axios.put("http://localhost:4000/api/locations", toSubmit).then((res) => {
      resetForm({});
      setUserInfo({ ...userInfo });
    });
  };
  const validate = () => {};
  const formik = useFormik({ initialValues, onSubmit, validate });
  return (
    <form onSubmit={formik.handleSubmit} action="/api/locations" method="put">
      <div>
        <h3>Edit Location</h3>
      </div>
      <div>
        <span>Group: {currGroup}</span>
      </div>
      <div>
        <label htmlFor="locationName">Name: </label>
        <input
          name="locate_name"
          type="text"
          placeholder="please enter a name.."
          onChange={formik.handleChange}
          value={formik.values.locate_name}
        />
      </div>
      <div>
        <label htmlFor="locationDesc">Description: </label>
        <textarea
          name="locate_desc"
          placeholder="please enter a description.."
          onChange={formik.handleChange}
          value={formik.values.locate_desc}
        />
      </div>
      <div>
        <button type="submit">Edit Location</button>
      </div>
    </form>
  );
}

export default EditLocation;
