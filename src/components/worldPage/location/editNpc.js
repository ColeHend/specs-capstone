import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../App";
import { useFormik } from "formik";
import axios from "axios";
function EditNPC(props) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { char_id, char_name, char_desc } = props.editHold;
  const initialValues = {
    npc_name: char_name,
    npc_desc: char_desc,
    char_id,
  };
  const onSubmit = (values, { resetForm }) => {
    axios.put("/api/npc", { ...values, ...userInfo, char_id }).then((res) => {
      resetForm();
      setUserInfo({ ...userInfo });
    });
  };
  const validate = (values) => {};
  const formik = useFormik({ initialValues, onSubmit, validate });
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={formik.handleSubmit}
      action=""
      method="post"
    >
      <label htmlFor="npc_name">Name</label>
      <input
        name="npc_name"
        value={formik.values.npc_name}
        onChange={formik.handleChange}
        placeholder="Add npc name"
        type="text"
      />
      <label htmlFor="npc_desc">Description</label>
      <textarea
        placeholder="Add npc description"
        name="npc_desc"
        id="npc_desc"
        onChange={formik.handleChange}
        value={formik.values.npc_desc}
        cols={30}
        rows={10}
      ></textarea>
      <button type="submit">Edit NPC</button>
    </form>
  );
}

export default EditNPC;
