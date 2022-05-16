import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { UserContext } from "../../../App";
function Group(props) {
  const { userInfo, setUserInfo } = React.useContext(UserContext);
  const { user_id, curr_world_id: world_id } = props.theWorld;
  const { theGroups, setTheGroups } = props.theGroups;
  const initialValues = {
    groupName: "",
    groupDesc: "",
  };
  const onSubmit = (values, { resetForm }) => {
    axios
      .post("/api/groups", {
        user_id: +user_id,
        world_id: +world_id,
        group_name: values.groupName,
        group_desc: values.groupDesc,
      })
      .then((dbRes) => {
        resetForm();
        console.log("addGroup testing---: ", dbRes.data[0]);
        setTheGroups([
          ...theGroups,
          {
            ...dbRes.data[0][0],
            user_id: +user_id,
            world_id: +world_id,
            group_name: values.groupName,
            group_desc: values.groupDesc,
          },
        ]);
        setUserInfo({ ...userInfo });
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
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default Group;
