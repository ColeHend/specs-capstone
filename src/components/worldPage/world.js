import React from "react";
import { useFormik } from "formik";
import "./world.css";
function World() {
  const initialValues = {
    title: "",
    desc: "",
  };
  const onSubmit = (values) => {};
  const validate = (values) => {};
  const formik = useFormik({ initialValues, onSubmit, validate });
  return (
    <div className="WorldInfo">
      <div>
        <h3>Create A World</h3>
      </div>
      <form onSubmit={formik.handleSubmit} action="/api/worlds" method="post">
        <div className="worldForm">
          <div className="titleDiv">
            <h4>Title</h4>
            <input
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="title..."
              name="title"
              type="text"
            />
          </div>
          <div className="descDiv">
            <h4>Desciption</h4>
            <textarea
              onChange={formik.handleChange}
              value={formik.values.desc}
              placeholder="enter a description..."
              name="desc"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default World;
