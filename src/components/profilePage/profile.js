import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import "./profile.css";
import localInfo from "../utils/localinfo";
import Collapsable from "./collapsable";

function Profile(props) {
  const [worldList, setWorldList] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserContext);
  // @ts-ignore
  const { setEditInfo } = props.editInfo;

  useEffect(() => {
    const info = localInfo();
    console.log("info: ", info);
    axios
      .get(`http://localhost:4000/api/getWorlds/${+userInfo.user_id}`)
      .then(({ data }) => {
        console.log("Success!", data[0]);
        setWorldList(data[0]);
      })
      .catch((err) => console.log(err));
  }, [setWorldList, userInfo]);

  const renderWorlds = () => {
    if (worldList.length > 0) {
      return worldList.map((world, index) => {
        return (
          <li key={world + index}>
            <Collapsable
              setEditInfo={{ setEditInfo, userInfo, setUserInfo }}
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

  // : <World step="edit" editInfo={editInfo} />
  return (
    <div>
      <ul className="worldList">{renderWorlds()}</ul>
    </div>
  );
}

export default Profile;
