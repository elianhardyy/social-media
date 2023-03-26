import React, { useState } from "react";
import { Link, NavLink, useResolvedPath, useMatch } from "react-router-dom";
import { MenuList } from "./MenuList";
import "./Navbar.scss";
import UserProfile from "./user.png";
import Dropdown from "../Dropdown/Dropdown";
import SearchIcon from "@mui/icons-material/Search";
import TextsmsIcon from "@mui/icons-material/Textsms";
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <div className={isActive ? "active" : ""} {...props}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}
const Navbar = ({ user, setUser }) => {
  // useEffect(() => {
  //   setUser(user);
  // }, []);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  const onClickNavbar = () => {
    setDropdown(true);
  };
  async function logout() {
    await fetch("http://localhost:4000/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    localStorage.removeItem("token");
    setUser("");
  }
  let menu;
  const menuList = MenuList.map((menu, index) => {
    return (
      <>
        <CustomLink to={menu.url} key={index}>
          {menu.title}
        </CustomLink>
      </>
    );
  });
  if (user.is_active === true) {
    menu = (
      <>
        <div className="left">
          <Link
            href="/dashboard"
            className="site-title"
            style={{ textDecoration: "none" }}
          >
            <span>Social Media</span>
          </Link>
          {menuList}
          <div className="search">
            <SearchIcon />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="right">
          <div className="messanger">
            <TextsmsIcon />
          </div>
          <div
            className="user"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link to={`/social/${user.username}`} className="nav-links">
              <img
                src={
                  "http://localhost:4000/public/" + user.profile.photo != null
                    ? "http://localhost:4000/public/" + user.profile.photo
                    : "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
                }
                width="40px"
                className="rounded"
              />
            </Link>
            {dropdown && <Dropdown user={user} logout={logout} />}
          </div>
        </div>
      </>
    );
  } else {
    <h1>Jancok</h1>;
  }
  return <nav className="nav">{menu}</nav>;
};

export default Navbar;
