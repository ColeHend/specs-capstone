import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../App";
import { useFormik } from "formik";
import axios from "axios";
function AddNpc(props) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const initialValues = {
    npc_name: "",
    npc_desc: "",
  };
  const onSubmit = (values, { resetForm }) => {
    axios.post("/api/npc", { ...values, ...userInfo }).then((res) => {
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
    <form onSubmit={formik.handleSubmit} action="" method="post">
      <input
        name="npc_name"
        value={formik.values.npc_name}
        onChange={formik.handleChange}
        placeholder="Add npc name"
        type="text"
      />
      <textarea
        placeholder="Add npc description"
        name="npc_desc"
        id="npc_desc"
        onChange={formik.handleChange}
        value={formik.values.npc_desc}
        cols={30}
        rows={10}
      ></textarea>
      <button type="submit">Add NPC</button>
    </form>
  );
}

export default AddNpc;
