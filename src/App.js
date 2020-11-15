import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import GridContainer from "./containers/GridContainer/GridContainer";
import dayjs from "dayjs";
import axios from "axios";

class App extends Component {
  state = {
    dataCounties: [],
    totalCasesVA: 0,
    totalDeathVA: 0,
    totalCasesUS: 0,
    totalDeathUS: 0,
    maxTotalCases: 0,
    minTotalCases: Infinity,
    fetching: true
  };
  componentDidMount() {
    let localityURL = `https://data.virginia.gov/resource/bre9-aqqr.json?$where=report_date == '${this.getTime(
      true
    )}'`;
    let usURL = `https://data.cdc.gov/resource/9mfq-cb36.json?$where=submission_date== '${this.getTime(
      false
    )}'&$select=sum(tot_cases),sum(tot_death)`;
    //post request
    const requestLocality = axios.get(localityURL);
    const requestUS = axios.get(usURL);
    axios.all([requestLocality, requestUS]).then(
      axios.spread((...responses) => {
        const responseLocality = responses[0];
        const responseUS = responses[1];
        let maxTotalCases = 0;
        let minTotalCases = Infinity;
        let totalCasesVA = 0;
        let totalDeathVA = 0;
        const dataCounties = [];

        //convert all fetched data into this component's state
        for (let i = 0; i < responseLocality.data.length; i++) {
          let county = {
            id: +responseLocality.data[i].fips,
            name: responseLocality.data[i].locality,
            value: +responseLocality.data[i].total_cases,
            totalDeaths: +responseLocality.data[i].deaths,
          };
          totalCasesVA += county.value;
          totalDeathVA += county.totalDeaths;
          //find the county with most total confirmed cases
          if (county.value > maxTotalCases) {
            maxTotalCases = county.value;
          }
          //find the county with least total confirmed cases
          if (county.value < minTotalCases) {
            minTotalCases = county.value;
          }
          dataCounties.push(county);
        }
        this.setState({
          dataCounties: dataCounties,
          totalCasesVA: totalCasesVA,
          totalDeathVA: totalDeathVA,
          totalCasesUS: responseUS.data[0].sum_tot_cases,
          totalDeathUS: responseUS.data[0].sum_tot_death,
          maxTotalCases: maxTotalCases,
          minTotalCases: minTotalCases,
          fetching: false
        });
      })
    );
  }
  //since the CDC database seems to update their data slower than VHD
  // if it is VA, current time - 1 day
  // else current time - 2 days
  getTime = (isVA) => {
    let time = null;
    let offset = 2;
    if (isVA) {
      offset = 1;
    }
    if (dayjs().hour() < 6) {
      time = dayjs()
        .subtract(offset, "days")
        .startOf("date")
        .format()
        .slice(0, -6);
    } else {
      if (isVA) {
        time = dayjs().startOf("date").format().slice(0, -6);
      } else {
        time = dayjs()
          .subtract(offset - 1, "days")
          .startOf("date")
          .format()
          .slice(0, -6);
      }
    }
    return time;
  };

  render() {

    return (
      <div>
        {this.state.fetching ? (
          <p>Loading....</p>
        ) : (
          <Layout>
            <GridContainer
              dataCounties={this.state.dataCounties}
              totalCasesVA={this.state.totalCasesVA}
              totalDeathVA={this.state.totalDeathVA}
              totalCasesUS={this.state.totalCasesUS}
              totalDeathUS={this.state.totalDeathUS}
              maxTotalCases={this.state.maxTotalCases}
              minTotalCases={this.state.minTotalCases}
            />
          </Layout>
        )}
      </div>
    );
  }
}

export default App;
