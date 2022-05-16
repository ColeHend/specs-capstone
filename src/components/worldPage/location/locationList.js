import React, { useContext, useEffect } from "react";
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
function LocationList(props) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { editHold, setEditHold } = props.editHold;
  const [npcArr, setNpcArr] = React.useState([]);
  const { theLocations, setTheLocations, setAddingGroup } = props.theLocations;
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/locations/${userInfo.curr_world_id}`)
      .then(({ data }) => {
        axios
          .get(`http://localhost:4000/api/npc/${userInfo.curr_world_id}`)
          .then((dbRes) => {
            console.log("npcs: ", dbRes.data);
            setNpcArr(dbRes.data[0]);
          });
        setTheLocations(data[0]);
        console.log("locations: ", theLocations);
      });

    console.log(userInfo);
    console.log("filter: ", userInfo.curr_group_id);
  }, [setTheLocations, userInfo, theLocations]);

  const handleClick = (e) => setAddingGroup("location");
  const handleNpcClick = ({ location_id }) => {
    setAddingGroup("npc");
    setUserInfo({ ...userInfo, curr_location_id: location_id });
  };
  const handleEditClick = (location) => {
    setAddingGroup("editLocation");
    setEditHold(location);
  };
  const handleEditNPC = (npc) => {
    setAddingGroup("editNPC");
    setEditHold({ ...editHold, ...npc });
  };
  return (
    <div>
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
                trigger={
                  <LocationTitle
                    setAddingGroup={setAddingGroup}
                    location={location}
                  />
                }
              >
                <button
                  style={{ display: "block" }}
                  onClick={() => handleNpcClick(location)}
                >
                  Add NPC
                </button>
                <button onClick={() => handleEditClick(location)}>
                  Edit Location
                </button>
                <div>{location.location_desc}</div>
                <div>
                  <ul style={{ listStyleType: "none" }}>
                    {npcArr
                      .filter((npc) => npc.location_id === location.location_id)
                      .map((daNPC) => (
                        <Collapsible
                          openedClassName="locationCollapse"
                          contentOuterClassName="locationCollapseOuter"
                          contentInnerClassName="locationCollapseInner"
                          className="locationCollapse"
                          trigger={
                            <LocationTitle
                              location={{ title: daNPC.char_name }}
                            />
                          }
                        >
                          <div>
                            <button onClick={() => handleEditNPC(daNPC)}>
                              Edit NPC
                            </button>
                          </div>
                          <div>{daNPC.char_desc}</div>
                        </Collapsible>
                      ))}
                  </ul>
                </div>
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
