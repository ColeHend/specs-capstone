import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { UserContext } from "../../../App";
function EditGroup(props) {
  const { userInfo, setUserInfo } = React.useContext(UserContext);
  const { group_id, group_name, group_desc } = props.editHold;

  const initialValues = {
    groupName: group_name,
    groupDesc: group_desc,
  };
  const onSubmit = (values, { resetForm }) => {
    axios
      .put("/api/groups", {
        group_id,
        group_name: values.groupName,
        group_desc: values.groupDesc,
      })
      .then((dbRes) => {
        resetForm();
        setUserInfo({ ...userInfo });
      });
  };
  const validate = (values) => {};
  const formik = useFormik({ initialValues, onSubmit, validate });
  return (
    <form onSubmit={formik.handleSubmit} action="/api/groups" method="put">
      <div>
        <label htmlFor="groupName">Name: </label>
        <input
          name="groupName"
          value={formik.values.groupName}
          onChange={formik.handleChange}
          placeholder="Please enter group name.."
          type="text"
        />
      </div>

      <div>
        <label htmlFor="groupDesc">Description: </label>
        <input
          name="groupDesc"
          value={formik.values.groupDesc}
          placeholder="Please enter description.."
          onChange={formik.handleChange}
          type="text"
        />
        <div>
          <button type="submit">Edit Group</button>
        </div>
      </div>
    </form>
  );
}

export default EditGroup;
