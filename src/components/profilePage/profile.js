import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import localInfo from "../utils/localinfo";
import Collapsible from "react-collapsible";
function Profile() {
  const [worldList, setWorldList] = useState([]);

  useEffect(() => {
    const info = localInfo();
    console.log("info: ", info);
    axios
      .get(`http://localhost:4000/api/getWorlds/${+info.user_id}`)
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
          worldList.map((world, index) => {
            return (
              <li key={world}>
                <Collapsible
                  openedClassName="worldCollapse"
                  contentOuterClassName="worldCollapseOuter"
                  contentInnerClassName="worldCollapseInner"
                  className="worldCollapse"
                  trigger={`${world[index].world_name} <--`}
                >
                  {world[index].world_desc}
                </Collapsible>
              </li>
            );
          })
        ) : (
          <li>No Worlds Found</li>
        )}
      </ul>
    </div>
  );
}

export default Profile;
