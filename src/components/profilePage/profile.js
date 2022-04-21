import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
function Profile() {
  const [worldList, setWorldList] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/getWorlds`)
      .then(({ data }) => {
        console.log("Success!", data);
        setWorldList(data);
      })
      .catch((err) => console.log(err));
  }, [setWorldList]);
  return (
    <div>
      <ul className="worldList">
        {worldList.length > 0 ? (
          worldList.map((world) => {
            return <li key={world}>world: {JSON.stringify(world)}</li>;
          })
        ) : (
          <li>No Worlds Found</li>
        )}
      </ul>
    </div>
  );
}

export default Profile;
