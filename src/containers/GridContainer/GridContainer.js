import React from "react";
import Card from "../Card/Card";
import Map from "../../components/Map/Map";
import SearchBox from "../../components/SearchBox/SearchBox";
import classes from "./GridContainer.module.css";

const gridContainer = (props) => {
  const names = props.dataCounties.map(county => county.name);
  return (
    <div className={classes.GridContainer}>
      <div className={classes.Header}>
        <p>Virginia County Map in Total Confirmed Cases</p>
      </div>
      <div className={classes.Main}>
        <Map
          mapData={props.dataCounties}
          maxTotalCases={props.maxTotalCases}
          minTotalCases={props.minTotalCases}
        />
      </div>
      <div className={classes.Search}>
        {/* <p>Search</p> */}
        <SearchBox items = {names}/>
      </div>
      <div className={classes.Card1}>
        <Card
          title="U.S Confirmed"
          content={props.totalCasesUS
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        />
      </div>
      <div className={classes.Card2}>
        <Card
          title="U.S Deaths"
          content={props.totalDeathUS
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        />
      </div>
      <div className={classes.Card3}>
        <Card
          title="VA Confirmed"
          content={props.totalCasesVA
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        />
      </div>
      <div className={classes.Card4}>
        <Card
          title="VA Deaths"
          content={props.totalDeathVA
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        />
      </div>
    </div>
  );
};
export default gridContainer;
