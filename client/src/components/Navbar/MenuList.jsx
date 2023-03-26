import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GridViewIcon from "@mui/icons-material/GridView";

export const MenuList = [
  {
    title: <HomeRoundedIcon />,
    url: "/dashboard",
    className: "home-nav",
  },
  {
    title: <GridViewIcon />,
    url: "/group",
    className: "group-nav",
  },
  {
    title: "About",
    url: "/about",
    className: "about-nav",
  },
];
