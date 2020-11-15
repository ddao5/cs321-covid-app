import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usa_vaLow from "@amcharts/amcharts4-geodata/region/usa/vaLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import classes from "./Map.module.css";

class Map extends Component {
  map = null;
  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    let map = am4core.create("chartdiv", am4maps.MapChart);
    //do not allow dragging the mapp
    // map.seriesContainer.draggable = false;
    //creates intial fade-in
    map.hiddenState.properties.opacity = 0;
    //set map definition
    map.geodata = am4geodata_region_usa_vaLow;
    //set projection
    map.projection = new am4maps.projections.Miller();

    //create map polygon series
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

    //make map load polygon data (i.e county or city names) from GEOJSON
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
    let heatLegend = map.createChild(am4maps.HeatLegend);
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

    map.logo.disabled = true;
    polygonSeries.data = this.props.mapData;
    // make home button
    let button = map.chartContainer.createChild(am4core.Button);
    button.padding(15, 15, 15, 15);
    button.align = "right";
    button.marginRight = 15;
    button.events.on("hit", function () {
      map.goHome();
    });
    button.icon = new am4core.Sprite();
    button.icon.path =
      "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
    this.map = map;
  }
  render() {
    return <div id="chartdiv" className={classes.Map}></div>;
  }
}

export default Map;
