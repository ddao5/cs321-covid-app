import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import classes from "./ChartModal.module.css";
export default class ChartModal extends Component {
  // state = {
  //   show: true,
  //   fetching: true,
  //   dataDate: [],
  // };
  chart1 = null;
  chart2 = null;
  processed = [];

  processData = () => {
    for (let i = 1; i < this.props.dataDate.length; ++i) {
      let date = {
        date: this.props.dataDate[i].date,
        newCases:
          this.props.dataDate[i].cases - this.props.dataDate[i - 1].cases,
        hospitalizations: this.props.dataDate[i].hospitalizations,
      };
      this.processed.push(date);
    }
    for (let i = 0; i < this.processed.length; i++) {
      if (i - 3 >= 0 && i + 3 < this.processed.length) {
        // processed[i].average = 0;
        this.processed[i].average =
          (this.processed[i - 3].newCases +
            this.processed[i - 2].newCases +
            this.processed[i - 1].newCases +
            this.processed[i - 0].newCases +
            this.processed[i - 1].newCases +
            this.processed[i - 2].newCases +
            this.processed[i - 3].newCases) /
          7;
      }
    }
  };
  createFirstChart() {
    let chart = am4core.create("chartdiv1", am4charts.XYChart);
    chart.data = this.processed;

    //define axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.disabled = true;
    dateAxis.title.text = "Dates";
    let valueAxis_1 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis_1.title.text = "Daily Cases";

    //First series
    let series_1 = chart.series.push(new am4charts.ColumnSeries());
    series_1.dataFields.valueY = "newCases";
    series_1.dataFields.dateX = "date";
    series_1.name = "Daily Cases";

    //Second series
    let series_2 = chart.series.push(new am4charts.LineSeries());
    series_2.dataFields.valueY = "average";
    series_2.dataFields.dateX = "date";
    series_2.strokeWidth = 3;
    series_2.name = "7-day moving average";
    series_2.yAxis = valueAxis_1;

    //chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.legend = new am4charts.Legend();
    this.chart1 = chart;
  }
  createSecondChart() {
    let chart = am4core.create("chartdiv2", am4charts.XYChart);
    chart.data = this.processed;
    //create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.disabled = true;
    dateAxis.title.text = "Dates";
    let valueAxis_1 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis_1.title.text = "Hospitalizations";

    //Series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "hospitalizations";
    series.dataFields.dateX = "date";
    series.name = "Hospitalizations";
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    this.chart2 = chart;
  }
  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_kelly);
    this.processData();
    this.createFirstChart();
    this.createSecondChart();
  }
  componentWillUnmount() {
    this.chart1.dispose();
    this.chart2.dispose();
  }
  render() {
    return (
      <>
        <h4>{this.props.name}'s Statistics</h4>
        <div className = {classes.Container}>
          <div id="chartdiv1" className={classes.Chart}></div>
          <div id="chartdiv2" className={classes.Chart}></div>
        </div>
      </>
    );
  }
}
