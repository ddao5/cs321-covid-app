import React from "react";
import classes from "./Card.module.css";
const card = (props) => {
  return (
    <div className={classes.Card}>
      <p>{props.title}</p>
      <p>{props.content}</p>
    </div>
  );
};
export default card;
