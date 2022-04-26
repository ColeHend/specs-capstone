import React from "react";
import Collapsible from "react-collapsible";
import { Link } from "react-router-dom";
function Collapsable(props) {
  const { theworld, setEditInfo } = props;
  const { world_id } = theworld;
  const editHandle = (e) => {
    console.log(e);
    setEditInfo(theworld);
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
        <Link to={`/world/${world_id}`}>
          <button onClick={editHandle}>Edit</button>
        </Link>
      </Collapsible>
    </div>
  );
}

export default Collapsable;
