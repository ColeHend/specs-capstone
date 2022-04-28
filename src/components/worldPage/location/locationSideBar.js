import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
function SideBar(props) {
  const { world_id } = props.theWorld;
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { currGroup, setCurrGroup, setAddingGroup } = props;
  const addGroup = () => {
    setAddingGroup(true);
  };
  const [theGroups, setTheGroups] = useState([]);
  const [selectStyle, setSelectStyle] = useState({});
  const onClickHandle = (element) => {
    setCurrGroup(element.group_name);
    setAddingGroup(false);
    setUserInfo({ ...userInfo, curr_group_id: element.group_id });
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
