import React, { useEffect, useState, useContext } from "react";
import Canvas from "./canvas";
import { UserContext } from "../../App";
import axios from "axios";
import "./map.css";
import LocationsCollection from "./locations";
function Map() {
  const [myLocations, setMyLocations] = useState([]);
  const [placeMark, setPlaceMark] = useState({ isPlacing: false, x: 0, y: 0 });
  const [markers, setMarkers] = useState([]);
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/locations/${userInfo.curr_world_id}`)
      .then(({ data }) => {
        setMyLocations(data[0]);
      })
      .catch((err) => console.log(err));
  }, [userInfo]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div id="map">
        <Canvas
          placeMark={{ placeMark, setPlaceMark }}
          markers={{ markers, setMarkers }}
        />
      </div>
      <div id="mapLocations">
        <LocationsCollection
          placeMark={{ placeMark, setPlaceMark }}
          markers={{ markers, setMarkers }}
          myLocations={myLocations}
        />
      </div>
    </div>
  );
}
export default Map;
