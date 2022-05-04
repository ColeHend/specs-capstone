import React from "react";
import Collapsible from "react-collapsible";
import { Link } from "react-router-dom";
function CollapTitle(props) {
  const { title, isOpen } = props;
  const style = {
    float: "right",
  };
  return (
    <div>
      <span>{title}</span>
      {isOpen ? (
        <span className="collapseArrow">{"v"}</span>
      ) : (
        <span className="collapseArrow">{"<"}</span>
      )}
    </div>
  );
}
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
        triggerWhenOpen={
          <CollapTitle isOpen={true} title={theworld.world_name} />
        }
        trigger={<CollapTitle isOpen={false} title={theworld.world_name} />}
      >
        <div className="collapseButtons">
          <Link to={`/worldedit`}>
            <button onClick={editHandle}>Edit</button>
          </Link>
          <Link to={`/map`}>
            <button onClick={mapHandle}>Map</button>
          </Link>
        </div>
        <div>{theworld.world_desc}</div>
      </Collapsible>
    </div>
  );
}

export default Collapsable;
