import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usa_vaLow from "@amcharts/amcharts4-geodata/region/usa/vaLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import classes from './Map.module.css';

class Map extends Component {
    state = {
        mapData: [],
        maxTotalCases: 0,
        minTotalCases: Infinity
    };
    map = null;
    componentDidMount() {
        am4core.useTheme(am4themes_animated);
        let map = am4core.create("chartdiv", am4maps.MapChart);
        //do not allow dragging the mapp
        map.seriesContainer.draggable = false;
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
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#f7aea6");

        //create hover state and set alternative fill color
        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#b51907");

        map.logo.disabled = true;
        this.map = map;
    }
    render() {
        return (
            <div id="chartdiv" className={classes.Map}></div>
        );
    }
}

export default Map;