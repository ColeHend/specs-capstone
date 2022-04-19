import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Login from "./login/login";
import Register from "./login/register";
export default function LoginBar(props) {
  const MySwal = withReactContent(Swal);
  const theLogin = () =>
    MySwal.fire({
      title: <p>Welcome</p>,
      footer: "Copyright",
      html: <Login />,
      showConfirmButton: false,
    });
  const theRegister = () =>
    MySwal.fire({
      title: <p>Welcome</p>,
      footer: "Copyright",
      html: <Register />,
      showConfirmButton: false,
    });
  return (
    <div>
      <button onClick={theLogin}>login</button>
      <button onClick={theRegister}>register</button>
    </div>
  );
}
