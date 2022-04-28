import React, { useContext } from "react";
import { UserContext } from "../../App";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Login from "../login/login";
import Register from "../login/register";
import "./nav.css";

export default function LoginBar(props) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { setIsLoggedIn } = props;
  const MySwal = withReactContent(Swal);
  const theLogin = () =>
    MySwal.fire({
      title: <p>Welcome</p>,
      footer: "Copyright",
      html: (
        <Login
          userInfo={{ userInfo, setUserInfo }}
          close={MySwal.close}
          setIsLoggedIn={setIsLoggedIn}
        />
      ),
      showConfirmButton: false,
    });
  const theRegister = () =>
    MySwal.fire({
      title: <p>Welcome</p>,
      footer: "Copyright",
      html: <Register close={MySwal.close} setIsLoggedIn={setIsLoggedIn} />,
      showConfirmButton: false,
    });
  return (
    <div className="navBar">
      <button onClick={theLogin}>login</button>
      <button onClick={theRegister}>register</button>
    </div>
  );
}
