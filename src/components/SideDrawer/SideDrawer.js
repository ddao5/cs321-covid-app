import React from "react";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import Backdrop from "../UI/Backdrop/Backdrop";
import Logo from "../Logo/Logo";
import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.open];
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
