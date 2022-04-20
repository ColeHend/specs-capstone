import React from "react";

export default function TheHeader(props) {
  const localInfo = () => {
    let user_id = window.localStorage.getItem("user_id");
    let username = window.localStorage.getItem("username");
    return { user_id, username };
  };
  let theInfo = localInfo();
  return (
    <div>
      <h1>Hello welcome {theInfo.username ? theInfo.username : ""}</h1>
    </div>
  );
}
