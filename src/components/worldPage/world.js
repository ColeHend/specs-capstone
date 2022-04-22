import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import "./world.css";
import localInfo from "../utils/localinfo";
function World() {
  const initialValues = {
    title: "",
    desc: "",
    img_link: "",
  };
  const onSubmit = (values) => {
    const url = "http://localhost:4000";
    const info = localInfo();
    axios
      .post(url + "/api/worlds", {
        user_id: info.user_id,
        world_name: values.title,
        world_desc: values.desc,
        map_img_link: values.img_link,
      })
      .then((dbRes) => console.log("successful submit", dbRes))
      .catch((err) => console.log(err));
  };
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
              cols={25}
              rows={10}
            />
          </div>
          <div className="imgLinkDiv">
            <h4>Custom Map Image</h4>
            <input
              name="img_link"
              type="text"
              placeholder="enter link to an map img.."
              onChange={formik.handleChange}
              value={formik.values.img_link}
            />
            <div>
              <img
                className="mapDisplay"
                src={formik.values.img_link}
                alt="custom map display"
              />
            </div>
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
