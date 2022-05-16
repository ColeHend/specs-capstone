import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
import Collapsible from "react-collapsible";
function LocationTitle(props) {
  const { title } = props.location;

  return (
    <div>
      <span>{title}</span>
    </div>
  );
}
function SideBar(props) {
  const { world_id } = props.theWorld;
  const { editHold, setEditHold } = props.editHold;
  const { userInfo, setUserInfo } = useContext(UserContext);
  let theWorldsID;
  if (world_id !== undefined) {
    theWorldsID = world_id;
  } else if (userInfo.current_world_id !== undefined) {
    theWorldsID = userInfo.current_world_id;
  }

  const { currGroup, setCurrGroup, setAddingGroup, addingGroup } = props;
  const addGroup = () => {
    setAddingGroup("group");
  };
  const { theGroups, setTheGroups } = props.theGroups;

  const [selectStyle, setSelectStyle] = useState({});
  const onClickHandle = (element) => {
    setCurrGroup(element.group_name);
    setAddingGroup("location");
    setUserInfo({ ...userInfo, curr_group_id: element.group_id });
    setSelectStyle({ border: "1px dashed #00f" });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/groups/${theWorldsID}`)
      .then((res) => {
        const { data } = res;
        console.log("groups: ", data);
        setTheGroups(data[0]);
      })
      .catch((err) => console.log(err));
  }, [theWorldsID, setTheGroups]);

  const editGroupHandle = (group) => {
    setEditHold({ ...editHold, ...group });

    setAddingGroup("editGroup");
    console.log("editHold: ", editHold, addingGroup);
  };
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
                <div>
                  <Collapsible
                    openedClassName="locationCollapse"
                    contentOuterClassName="locationCollapseOuter"
                    contentInnerClassName="locationCollapseInner"
                    className="locationCollapse"
                    trigger={
                      <LocationTitle location={{ title: element.group_name }} />
                    }
                  >
                    <div>
                      <button onDoubleClick={() => editGroupHandle(element)}>
                        Edit Group
                      </button>
                    </div>
                    <div>{element.group_desc}</div>
                  </Collapsible>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default SideBar;
