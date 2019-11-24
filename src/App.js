import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';

import { ForecastAdapter } from './adapters';

import { DebugLiftData } from './components/DebugData';
import Greeting from './components/Greeting';
import { Header, InfoBox } from './components/Header';
import FormContainer from './containers/FormContainer';

var month = (new Date()).getMonth();
var season = month <= 3 || month >= 10 ? "winter" : "normal";

export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      debug: 3, // 0: no debug, 1: also console.log(debug renders), 2: also call only 1 LIFT instead of 6, 3: offline lift data
      current: 0,
      season: season,
      units: this.get_units("ºF"),
      data: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
      // data: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
      // tides: [ {}, {}, {}, {}, {}, {}, {}, {}, {} ],
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      forecast_days: this.get_forecast_days(),
      lifts: 0,
      tides: 0,
      login: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var calls = [], { lifts, tides } = this.state;
    if (!prevState.login && this.state.login) {
      if (this.state.debug === 3) {
        this.setState({ data: DebugLiftData, lifts: 1 });
      } else {
        var pages = (this.state.debug === 2 ? 1 : 6);
        for (let x = 0; x < pages; x++) {
          calls.push(x, x+6);
        }
      }
      lifts = 1;
    }
    if (!prevState.tides && this.state.tides === 1) {
      for (let x = 12; x < 21; x++) {
        calls.push(x);
      }
      tides = 2;
    }

    if (calls.length > 0) this.update_data(calls, lifts, tides);
  }

  update_data(calls, lifts, tides) {
    ForecastAdapter.all(calls).then(all_called_data => {
      var current_data = this.state.data;
      console.log(current_data)
      all_called_data.forEach((data, i) => {
        current_data[calls[i]] = data;
      })
      this.setState({ data: current_data, lifts: lifts, tides: tides });
    })
  }

  get_forecast_days = () => {
    var days = [];
    const day = new Date().getDay()
    for (let i = day; i < day+5; i++) {
      days.push(i > 6 ? i-7 : i);
    }
    return days;
  }

  hl = () => {
    this.setState({ login: true });
  }

  handleTides = (event, result) => {
    event.preventDefault();
    this.setState({ tides: 1 });
  }

  handlePageChange = (event, result) => {
    event.preventDefault()
    const current = {"LIFT": 0, "LI": 1, "M2": 2, "M3": 3, "M4": 4, "M5": 5, "TIDES": 6, "CUSTOM": 7}
    this.setState({ current: current[result.children] })
  }

  handleSeasonChange = (event, result) => {
    event.preventDefault();
    this.setState({ season: result.value });
  }

  handleUnitChange = (event, result) => {
    event.preventDefault();
    const units = this.get_units(result.value);
    this.setState({ units: units });
  }

  get_units = (unit) => {
    var temperature = "ºF", precip = "IN", snow = "IN", speed = "MPH", distance = "MI";

    if (unit === "ºC") {
      temperature = "ºC";
      precip = "MM";
      snow = "CM";
      speed = "KPH";
      distance = "KM";
    };

    return {
      temperature: temperature,
      precip: precip,
      snow: snow,
      speed: speed,
      distance: distance
    };
  }

  render() {

    const { debug, login, data, forecast_days, current, season, lifts, tides, units } = this.state
    // console.log(JSON.stringify(data, null, 2))

    if (debug) console.log("\n\n" + this.constructor.name + " rendering", this);

    if (login) {
      return (
        <>
          <Header debug={ debug } current={ current } handlePageChange={ this.handlePageChange }/>
          <Grid id="body">
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={14}>
              <Grid.Row>
                <InfoBox debug={ debug } data={ data[current] } current={ current }
                  season={ season } handleSeasonChange={ this.handleSeasonChange }
                  units={ units } handleUnitChange={ this.handleUnitChange }
                />
              </Grid.Row>
              <Grid.Row id="forms">
                <FormContainer debug={ debug } data={ data } current={ current } season={ season }
                  forecast_days={ forecast_days } lifts={ lifts } tides={ tides } handleTides={ this.handleTides } units={ units }
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={1}>
            </Grid.Column>
          </Grid>
        </>
      )
    } else {
      return (
        <Greeting hl={ this.hl } p={ this.state.debug } />
      )
    }


  }

}
