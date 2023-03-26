import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Dropdown = ({ user, logout, block }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        <li>
          <Link
            to="/login"
            onClick={() => {
              setClick(logout);
            }}
            className="dropdown-link"
          >
            <LogoutIcon />
            Logout
          </Link>
        </li>
        <li>
          <Link
            to={`/social/${user.username}`}
            className="dropdown-link"
            onClick={() => setClick(false)}
          >
            <AccountCircleIcon />
            Profile
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Dropdown;
