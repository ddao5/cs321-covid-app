import React from "react";
import Card from "../Card/Card";
import Map from "../../components/Map/Map";
import classes from "./GridContainer.module.css";

const gridContainer = (props) => {
  return (
    <div className={classes.GridContainer}>
      <div className={classes.Header}>
        <p>
          Virignia County Map in Total Death Cases
        </p>
      </div>
      <div className={classes.Main}>
        <Map />
      </div>
      <div className={classes.Side}>
        <div>
          <Card title="Global Deaths" content="950,493" />
        </div>
        <div>
          <Card title="Global Confirmed" content="30,397,759" />
        </div>
      </div>
    </div>
  );
};
export default gridContainer;