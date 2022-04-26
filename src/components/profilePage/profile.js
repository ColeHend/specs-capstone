import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import localInfo from "../utils/localinfo";
import Collapsable from "./collapsable";
function Profile(props) {
  const [worldList, setWorldList] = useState([]);

  // @ts-ignore
  const { setEditInfo } = props.editInfo;
  const renderWorlds = () => {
    if (worldList.length > 0) {
      return worldList.map((world, index) => {
        return (
          <li key={world + index}>
            <Collapsable
              setEditInfo={setEditInfo}
              theworld={world}
              index={index}
            />
          </li>
        );
      });
    } else {
      return <li>No Worlds Found</li>;
    }
  };
  const renderList = () => {
    return (
      <div>
        <ul className="worldList">{renderWorlds()}</ul>
      </div>
    );
  };
  useEffect(() => {
    const info = localInfo();
    console.log("info: ", info);
    axios
      .get(`http://localhost:4000/api/getWorlds/${+info.user_id}`)
      .then(({ data }) => {
        console.log("Success!", data[0]);
        setWorldList(data[0]);
      })
      .catch((err) => console.log(err));
  }, [setWorldList]);
  // : <World step="edit" editInfo={editInfo} />
  return <div>{renderList()}</div>;
}

export default Profile;
