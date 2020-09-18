import React from "react";
import NavItem from "./NavigationItem/NavItem";
import classes from "./NavigationItems.module.css";
const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem link="/" exact>
        Home
      </NavItem>
      <NavItem link="/news">News</NavItem>
      <NavItem link="/about">About</NavItem>
    </ul>
  );
};
export default navigationItems;
