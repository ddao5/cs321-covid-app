import classes from "./ChartModal.module.css";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {Modal, Button} from 'react-bootstrap'
import dayjs from "dayjs";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


export default class ChartModal extends React.Component {
  state = {show : true};
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  
  componentDidMount(){
    console.log(this.getTime(30)); 
    
  }

 /* Function to subtract T days. 
 Usage:
 If date = 11/30 and T= 5, date = 11/25
  */
  getTime = (t) => {
    let time = null;

    time = dayjs()
    .subtract( t, "days")
    .startOf("date")
    .format()
    .slice(0, -6);

    return time;
  };

  componentWillUnmount(){
    // let chart = am4core.create("graphdiv", am4charts.XYChart);
    // chart.dispose();
    // we should dispose the chart here, but for now i ignored this issue
  }
 
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <Modal
        {...this.props}
        // bsSize="large"
        dialogClassName={classes.ChartModal} /*TODO / BUG this is to set the css to make the
        modal bigger and dynamic. but currently not working! */
        aria-labelledby="contained-modal-title-lg"
        /* onEnter function runs code after the modal loads,
        set the graph here */
        onEnter  = { function(){ 
          let chart = am4core.create("graphdiv", am4charts.XYChart);
          let data = [];
          let value = 50;

          // put random ata into the chart
        for(var i = 0; i < 300; i++){
          let date = new Date();
          date.setHours(0,0,0,0);
          date.setDate(i);
          value = Math.round((Math.random() < 0.5 ? 1 : 1) * Math.random() * 1000);
          data.push({date:date, value: value});
        }
        // set the data
        chart.data = data;

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 60;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}"

        series.tooltip.pointerOrientation = "vertical";

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.snapToSeries = series;
        chart.cursor.xAxis = dateAxis;

        //chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarX = new am4core.Scrollbar();
      }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">

            {this.props.county} County Cases Over Time

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div id="graphdiv">
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  county: PropTypes.string.isRequired
};

