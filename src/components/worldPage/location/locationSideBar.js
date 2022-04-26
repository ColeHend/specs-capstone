import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Group from "./group";
function SideBar(props) {
  const { world_id } = props.theWorld;
  const { currGroup, setCurrGroup } = props;
  const MySwal = withReactContent(Swal);
  const addGroup = () => {
    MySwal.fire({
      title: <p>Add Location Group</p>,
      footer: "Copyright",
      html: <Group theWorld={props.theWorld} close={MySwal.close} />,
      showConfirmButton: false,
    });
  };
  const [theGroups, setTheGroups] = useState([]);
  const [selectStyle, setSelectStyle] = useState({});
  const onClickHandle = (element) => {
    setCurrGroup(element.group_name);
    setSelectStyle({ border: "1px dashed #00f" });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/groups/${world_id}`)
      .then((res) => {
        const { data } = res;
        console.log(data);
        setTheGroups(data[0]);
      })
      .catch((err) => console.log(err));
  }, [world_id]);
  return (
    <div>
      <button onClick={addGroup}>Add Group</button>
      {theGroups.length > 0
        ? theGroups.map((element, index) => {
            return (
              <div
                style={currGroup === element.group_name ? selectStyle : {}}
                onClick={() => onClickHandle(element)}
                key={element + index}
              >
                {element.group_name}
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default SideBar;
