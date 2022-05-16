import React, { useState, useEffect } from "react";
import "./world.css";
import WorldCreate from "./worldCreate";
import Location from "./location/location";
function World(props) {
  const [theWorld, setTheWorld] = useState({});
  const { step, editInfo } = props;
  const [steps, setSteps] = useState(step);
  useEffect(() => {
    if (editInfo.world_id) {
      setTheWorld(editInfo);
    }
  }, [setTheWorld, editInfo]);
  // const { steps, setSteps } = step;
  return (
    <div>
      {steps === "new" ? (
        <WorldCreate theWorld={{ theWorld, setTheWorld }} setSteps={setSteps} />
      ) : steps === "edit" ? (
        <Location theWorld={theWorld} />
      ) : (
        <h1>Somethings Wrong</h1>
      )}
    </div>
  );
}

export default World;
