import React from "react";
import classes from "./Card.module.css";
const card = (props) => {
  return (
    <div className={classes.Card}>
      <p>{props.title}</p>
      <p className={classes.Number}>{props.content}</p>
      <footer>
        <p className={classes.Time}><b>Last Updated: </b>{props.time.slice(0,10)}</p>
      </footer>
      <hr></hr>
    </div>
  );
};
export default card;
