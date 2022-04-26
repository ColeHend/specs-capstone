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
  const worldForging = () => {
    switch (steps) {
      case "new":
        return (
          <WorldCreate
            theWorld={{ theWorld, setTheWorld }}
            setSteps={setSteps}
          />
        );
      case "edit":
        return <Location theWorld={theWorld} />;
      default:
        return <h1>Somethings Wrong</h1>;
    }
  };
  return <div>{worldForging()}</div>;
}

export default World;
