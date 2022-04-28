import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
import Collapsible from "react-collapsible";
function LocationList(props) {
  const { userInfo } = useContext(UserContext);
  const { theLocations, setTheLocations } = props.theLocations;
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/locations/${userInfo.curr_world_id}`)
      .then(({ data }) => {
        console.log(data);
        setTheLocations(data[0]);
      });
    console.log(userInfo);
    console.log("filter: ", userInfo.curr_group_id);
  }, [setTheLocations, userInfo]);

  const handleClick = (e) => {};
  return (
    <div>
      <div>LocationList</div>
      <div>
        <button onClick={handleClick}>Add Location</button>
      </div>
      {theLocations.length > 0 ? (
        theLocations
          .filter((location) => location.parent_id === userInfo.curr_group_id)
          .map((location) => (
            <div>
              <Collapsible
                openedClassName="locationCollapse"
                contentOuterClassName="locationCollapseOuter"
                contentInnerClassName="locationCollapseInner"
                className="locationCollapse"
                trigger={`${location.title} `}
              >
                {location.location_desc}
                locationID: {location.location_id}
                ParentID: {location.parent_id}
              </Collapsible>
            </div>
          ))
      ) : (
        <div>No Locations Found</div>
      )}
    </div>
  );
}

export default LocationList;
