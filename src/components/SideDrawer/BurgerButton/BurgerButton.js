import React from "react";
import classes from "./BurgerButton.module.css";

const burgerButton = (props) => (
  <div className={classes.BurgerButton} onClick = {props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default burgerButton;
