import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import dayjs from "dayjs";
import axios from "axios";
import am4geodata_region_usa_vaLow from "@amcharts/amcharts4-geodata/region/usa/vaLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import classes from "./Map.module.css";
import ChartModal from "../ChartModal/ChartModal";
import Modal from "../UI/Modal/Modal.js";

class Map extends Component {
  state = {
    show: false,
    name: null,
    dataDate: [],
  };

  closeModal = () => {
    this.setState({ show: false, name: null, dataDate: [] });
  };

  getTimeBoundaries = () => {
    let right = null;
    let left = null;
    if (dayjs().hour() < 12) {
      right = dayjs().subtract(1, "days").startOf("date").format().slice(0, -6);
      left = dayjs().subtract(33, "days").startOf("date").format().slice(0, -6);
    } else {
      right = dayjs().startOf("date").format().slice(0, -6);
      left = dayjs().subtract(32, "days").startOf("date").format().slice(0, -6);
    }
    return [left, right];
  };
  getLocalityData = (ev) => {
    const name = ev.target.dataItem.dataContext.name;
    const id = ev.target.dataItem.dataContext.id;
    let boundaries = this.getTimeBoundaries();
    let url = `https://data.virginia.gov/resource/bre9-aqqr.json?$where=report_date > '${
      boundaries[0]
    }' AND report_date < '${boundaries[1]}' AND fips=='${id.toString()}'`;
    //post request
    axios.get(url).then((res) => {
      const dataDate = [];
      for (let i = 0; i < res.data.length; ++i) {
        let date = {
          date: res.data[i].report_date.slice(0, 10),
          cases: +res.data[i].total_cases,
          deaths: +res.data[i].deaths,
          hospitalizations: +res.data[i].hospitalizations,
        };
        dataDate.push(date);
      }
      this.setState({
        show: true,
        name: name,
        dataDate: dataDate,
      });
    });
  };
  graph = null;
  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    let graph = am4core.create("graphdiv", am4maps.MapChart);
    //do not allow dragging the mapp
    graph.seriesContainer.draggable = false;
    //creates intial fade-in
    graph.hiddenState.properties.opacity = 0;
    //set graph definition
    graph.geodata = am4geodata_region_usa_vaLow;
    //set projection
    graph.projection = new am4maps.projections.Miller();

    //create graph polygon series
    let polygonSeries = graph.series.push(new am4maps.MapPolygonSeries());

    //make graph load polygon data (i.e county or city names) from GEOJSON
    polygonSeries.useGeodata = true;
    //Configures series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText =
      "{name}\nTotal Cases: {value}\nTotal Deaths: {totalDeaths}";
    polygonTemplate.fill = am4core.color("#f7aea6");
    //set up heat rules
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: am4core.color("#bdcafc"),
      max: am4core.color("#243fa6"),
      logarithmic: true,
    });
    let heatLegend = graph.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.minValue = this.props.minTotalCases;
    heatLegend.maxValue = this.props.maxTotalCases;
    heatLegend.valign = "top";
    heatLegend.align = "center";
    heatLegend.width = am4core.percent(50);
    heatLegend.markerContainer.height = 10;
    heatLegend.padding(15, 15, 15, 15);
    heatLegend.valueAxis.logarithmic = true;
    heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
    polygonSeries.mapPolygons.template.events.on("over", (event) => {
      handleHover(event.target);
    });

    polygonSeries.mapPolygons.template.events.on("hit", (event) => {
      handleHover(event.target);
    });

    function handleHover(mapPolygon) {
      if (!isNaN(mapPolygon.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
      } else {
        heatLegend.valueAxis.hideTooltip();
      }
    }
    polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
    polygonSeries.mapPolygons.template.events.on("out", (event) => {
      heatLegend.valueAxis.hideTooltip();
    });
    //create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#b51907");

    graph.logo.disabled = true;
    polygonSeries.data = this.props.mapData;
    // make home button
    let button = graph.chartContainer.createChild(am4core.Button);
    button.padding(15, 15, 15, 15);
    button.align = "right";
    button.marginRight = 15;
    button.events.on("hit", function () {
      graph.goHome();
    });
    button.icon = new am4core.Sprite();
    button.icon.path =
      "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
    this.graph = graph;

    // Modal open when you click on a County
    polygonTemplate.events.on("hit", (ev) => {
      // zoom to an object
      // pass county name as prop to the modal
      // this.setState((state, props) => ({
      //   county: ev.target.dataItem.dataContext.name,
      //   id: ev.target.dataItem.dataContext.id,
      //   show: true
      // }));
      this.getLocalityData(ev);
    });
  }
  render() {
    let chart = null;
    if (this.state.dataDate.length > 0) {
      chart = (
        <ChartModal
          dataDate={this.state.dataDate}
          name={this.state.name}
          modalClosed={this.closeModal}
        />
      );
    } else {
      chart = <p>Loading...</p>;
    }
    return (
      <>
        <div id="graphdiv" className={classes.Map}></div>
        <Modal show={this.state.show} modalClosed={this.closeModal}>
          {chart}
        </Modal>
      </>
    );
  }
}

export default Map;
