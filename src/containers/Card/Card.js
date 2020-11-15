import React from "react";
import classes from "./Card.module.css";
const card = (props) => {
  return (
    <div className={classes.Card}>
      <p>{props.title}</p>
      <p className={classes.Number}>{props.content}</p>
      <hr></hr>
    </div>
  );
};
export default card;
