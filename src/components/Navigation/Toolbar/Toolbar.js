import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import BurgerButton from "../../SideDrawer/BurgerButton/BurgerButton";
import Logo from "../../Logo/Logo";
import classes from "./Toolbar.module.css";

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <BurgerButton clicked={props.burgerButtonClicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
