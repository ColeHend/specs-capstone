import React from "react";
import axios from "axios";
import { useFormik } from "formik";
function Group(props) {
  const { user_id, curr_world_id: world_id } = props.theWorld;
  const initialValues = {
    groupName: "",
    groupDesc: "",
  };
  const onSubmit = (values) => {
    axios.post("/api/groups", {
      user_id: user_id,
      world_id: world_id,
      group_name: values.groupName,
      group_desc: values.groupDesc,
    });
    if (props.close) {
      props.close();
    }
  };
  const validate = (values) => {};
  const formik = useFormik({ initialValues, onSubmit, validate });
  return (
    <form onSubmit={formik.handleSubmit} action="/api/groups" method="post">
      <div>
        <input
          name="groupName"
          value={formik.values.groupName}
          onChange={formik.handleChange}
          placeholder="Please enter group name.."
          type="text"
        />
      </div>

      <div>
        <input
          name="groupDesc"
          value={formik.values.groupDesc}
          placeholder="Please enter description.."
          onChange={formik.handleChange}
          type="text"
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default Group;
