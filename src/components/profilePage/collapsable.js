import React from "react";
import Collapsible from "react-collapsible";
import { Link } from "react-router-dom";
function Collapsable(props) {
  const { theworld } = props;
  const { setEditInfo, setUserInfo, userInfo } = props.setEditInfo;
  const { world_id, map_img_link } = theworld;
  const editHandle = (e) => {
    setEditInfo(theworld);
    setUserInfo({ ...userInfo, curr_world_id: world_id });
  };
  const mapHandle = (e) => {
    setUserInfo({ ...userInfo, curr_world_id: world_id, map_img_link });
    console.log("userInfo: ", userInfo, world_id, map_img_link);
  };
  return (
    <div>
      <Collapsible
        openedClassName="worldCollapse"
        contentOuterClassName="worldCollapseOuter"
        contentInnerClassName="worldCollapseInner"
        className="worldCollapse"
        trigger={`${theworld.world_name} <--`}
      >
        {theworld.world_desc}
        <Link to={`/world`}>
          <button onClick={editHandle}>Edit</button>
        </Link>
        <Link to={`/map`}>
          <button onClick={mapHandle}>Map</button>
        </Link>
      </Collapsible>
    </div>
  );
}

export default Collapsable;
